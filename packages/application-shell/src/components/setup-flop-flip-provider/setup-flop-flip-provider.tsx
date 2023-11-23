import { ReactNode, useMemo } from 'react';
import { useApolloClient } from '@apollo/client/react';
import combineAdapters from '@flopflip/combine-adapters';
import httpAdapter from '@flopflip/http-adapter';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import type { TFlags } from '@flopflip/types';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  GRAPHQL_TARGETS,
  featureFlags,
} from '@commercetools-frontend/constants';
import useAllMenuFeatureToggles from '../../hooks/use-all-menu-feature-toggles';
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
  tenant: string;
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
    tenant: user?.launchdarklyTrackingTenant ?? '',
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

type TAdditionalEnvironmentProperties = {
  enableLongLivedFeatureFlags?: boolean;
};

export const SetupFlopFlipProvider = (props: TSetupFlopFlipProviderProps) => {
  const apolloClient = useApolloClient();
  const enableLongLivedFeatureFlags = useApplicationContext<
    TAdditionalEnvironmentProperties['enableLongLivedFeatureFlags'],
    TAdditionalEnvironmentProperties
  >((context) => context.environment.enableLongLivedFeatureFlags);
  const allMenuFeatureToggles = useAllMenuFeatureToggles();
  const flags = useMemo(
    () => ({
      ...featureFlags.FLAGS,
      ...allMenuFeatureToggles.allFeatureToggles,
      ...props.flags,
    }),
    [allMenuFeatureToggles.allFeatureToggles, props.flags]
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
      ...featureFlags.FLAGS,
      ...allMenuFeatureToggles.allFeatureToggles,
      ...props.defaultFlags,
    }),
    [allMenuFeatureToggles.allFeatureToggles, props.defaultFlags]
  );

  const adapterArgs = useMemo(
    () => ({
      user: {
        key: props.user?.id,
      },
      launchdarkly: {
        sdk: {
          // Allow to overwrite the client ID, passed via the `additionalEnv` properties
          // of the application config.
          // This is mostly useful for internal usage on our staging environments.
          clientSideId: props.ldClientSideId ?? ldClientSideIdProduction,
        },
        flags,
        context: getUserContextForLaunchDarklyAdapter(
          props.user,
          props.projectKey
        ),
      },
      http: {
        user: {
          key: props.user?.id,
        },
        execute: async function () {
          const response = await apolloClient.query<TAllFeaturesQuery>({
            query: AllFeaturesQuery,
            errorPolicy: 'ignore',
            context: {
              target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
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
          : !props.user || allMenuFeatureToggles.isLoading
      }
    >
      {props.children}
    </ConfigureFlopFlip>
  );
};

SetupFlopFlipProvider.displayName = 'SetupFlopFlipProvider';

export default SetupFlopFlipProvider;
