import { ReactNode, useMemo } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { adapter as combineAdapters } from '@flopflip/combine-adapters';
import { adapter as httpAdapter } from '@flopflip/http-adapter';
import { adapter as ldAdapter } from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import {
  type TAdapterIdentifiers,
  type TFlags,
  cacheIdentifiers,
  cacheModes,
  adapterIdentifiers,
} from '@flopflip/types';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  GRAPHQL_TARGETS,
  featureFlags,
} from '@commercetools-frontend/constants';
import type {
  TAllFeaturesQuery,
  TFetchLoggedInUserQuery,
} from '../../types/generated/mc';
import AllFeaturesQuery from './fetch-all-features.mc.graphql';

type TSetupFlopFlipProviderProps = {
  projectKey?: string;
  user?: TFetchLoggedInUserQuery['user'];
  flags?: TFlags;
  defaultFlags?: TFlags;
  ldClientSideId?: string;
  children: ReactNode;
  shouldDeferAdapterConfiguration?: boolean;
};

type TLaunchDarklyUserCustomFields = {
  kind: 'user';
  key?: string;
  project: string;
  id: string;
  team: string[];
  group: string;
  subgroup: string;
  cloudEnvironment: string;
};
type THttpAdapterUserCustomFields = {
  user: {
    key?: string;
    project?: string;
  };
};

type TFetchedHttpAdapterFlag = {
  name: string;
  value: boolean;
  reason?: string | null;
};
type TParsedHttpAdapterFlags = Record<
  string,
  {
    value: boolean;
    reason?: string | null;
  }
>;

// This value is hard-coded here because we want to make sure that the
// app uses our account of LD. The value is meant to be public, so there
// is no need to be concerned about security.
const ldClientSideIdProduction = '5979d95f6040390cd07b5e01';

function getUserContextForLaunchDarklyAdapter(
  user?: TSetupFlopFlipProviderProps['user'],
  projectKey?: string
): TLaunchDarklyUserCustomFields {
  return {
    kind: 'user',
    key: user?.id,
    project: projectKey ?? '',
    id: user?.launchdarklyTrackingId ?? '',
    team: user?.launchdarklyTrackingTeam ?? [],
    group: user?.launchdarklyTrackingGroup ?? '',
    subgroup: user?.launchdarklyTrackingSubgroup ?? '',
    cloudEnvironment: user?.launchdarklyTrackingCloudEnvironment ?? '',
  };
}

type TFetchedFlags = {
  allFeatures: TFetchedHttpAdapterFlag[];
};
const parseFlags = (fetchedFlags: TFetchedFlags): TParsedHttpAdapterFlags =>
  Object.fromEntries(
    fetchedFlags.allFeatures.map((fetchedFlag) => [
      fetchedFlag.name,
      {
        value: fetchedFlag.value,
        reason: fetchedFlag.reason,
      },
    ])
  );

const getCacheMode = (adapterIdentifier: TAdapterIdentifiers) => {
  if (
    // @ts-ignore
    typeof window.Cypress !== 'undefined' ||
    adapterIdentifier === adapterIdentifiers.http
  ) {
    // Temporary workaround: when running in Cypress, do not use lazy mode
    // as the flag is not being updated in time during the test run.
    return cacheModes.eager;
  }

  return cacheModes.lazy;
};

type TAdditionalEnvironmentProperties = {
  enableLongLivedFeatureFlags?: boolean;
};

export const SetupFlopFlipProvider = (props: TSetupFlopFlipProviderProps) => {
  const apolloClient = useApolloClient();
  const enableLongLivedFeatureFlags = useApplicationContext<
    TAdditionalEnvironmentProperties['enableLongLivedFeatureFlags'],
    TAdditionalEnvironmentProperties
  >((context) => context.environment.enableLongLivedFeatureFlags);
  const flags = useMemo(
    () => ({
      ...featureFlags.FLAGS,
      ...props.flags,
    }),
    [props.flags]
  );
  useMemo(() => {
    if (enableLongLivedFeatureFlags) {
      combineAdapters.combine([ldAdapter, httpAdapter]);
    } else {
      combineAdapters.combine([ldAdapter]);
    }
  }, [enableLongLivedFeatureFlags]);

  const defaultFlags = useMemo(
    () => ({
      ...featureFlags.DEFAULT_FLAGS,
      ...props.defaultFlags,
    }),
    [props.defaultFlags]
  );

  const adapterArgs = useMemo(
    () => ({
      user: {
        key: props.user?.id,
      },
      launchdarkly: {
        cacheIdentifier: cacheIdentifiers.local,
        cacheMode: getCacheMode(adapterIdentifiers.launchdarkly),
        sdk: {
          // Allow to overwrite the client ID, passed via the `additionalEnv` properties
          // of the application config.
          // This is mostly useful for internal usage on our staging environments.
          clientSideId: props.ldClientSideId ?? ldClientSideIdProduction,
          clientOptions: {
            sendEventsOnlyForVariation: true,
          },
        },
        flags,
        context: getUserContextForLaunchDarklyAdapter(
          props.user,
          props.projectKey
        ),
      },
      http: {
        // polling interval set to 15 minutes
        pollingIntervalMs: 1000 * 60 * 15,
        cacheIdentifier: cacheIdentifiers.local,
        cacheMode: getCacheMode(adapterIdentifiers.http),
        user: {
          key: props.user?.id,
        },
        execute: async (adapterArgs: THttpAdapterUserCustomFields) => {
          const response = await apolloClient.query<TAllFeaturesQuery>({
            query: AllFeaturesQuery,
            errorPolicy: 'ignore',
            fetchPolicy: 'network-only',
            context: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
              projectKey: adapterArgs.user?.project,
            },
          });

          return parseFlags(response.data);
        },
      },
    }),
    [apolloClient, flags, props.ldClientSideId, props.projectKey, props.user]
  );

  /**
   * The `<ApplicationShell />` tests itself. When it does so it can not setup and use
   * the `launchdarkly-adapter` and `http-adapter`. As a result the `process.env`
   * is evaluated and a test provider is rendered for feature flags.
   *
   * The `process.env` check also ensures that this block is excluded from production
   * bundles.
   */
  if (process.env.NODE_ENV === 'test') {
    const { TestProviderFlopFlip } = require('@flopflip/react-broadcast');

    return (
      <TestProviderFlopFlip flags={defaultFlags}>
        {props.children}
      </TestProviderFlopFlip>
    );
  }

  return (
    <ConfigureFlopFlip<typeof combineAdapters>
      adapter={combineAdapters}
      adapterArgs={adapterArgs}
      defaultFlags={defaultFlags}
      shouldDeferAdapterConfiguration={
        typeof props.shouldDeferAdapterConfiguration === 'boolean'
          ? props.shouldDeferAdapterConfiguration
          : !props.user
      }
    >
      {props.children}
    </ConfigureFlopFlip>
  );
};

SetupFlopFlipProvider.displayName = 'SetupFlopFlipProvider';

export default SetupFlopFlipProvider;
