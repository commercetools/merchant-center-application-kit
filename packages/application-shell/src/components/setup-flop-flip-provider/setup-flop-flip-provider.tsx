import type { TFlags } from '@flopflip/types';
import type {
  TAllFeaturesQuery,
  TFetchLoggedInUserQuery,
} from '../../types/generated/mc';

import React from 'react';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import httpAdapter from '@flopflip/http-adapter';
import combineAdapters from '@flopflip/combine-adapters';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { useApolloClient } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import useAllMenuFeatureToggles from '../../hooks/use-all-menu-feature-toggles';
import { FLAGS } from '../../feature-toggles';
import AllFeaturesQuery from './fetch-all-features.mc.graphql';

type Props = {
  projectKey?: string;
  user?: TFetchLoggedInUserQuery['user'];
  flags?: TFlags;
  defaultFlags?: TFlags;
  ldClientSideId?: string;
  children: React.ReactNode;
  shouldDeferAdapterConfiguration?: boolean;
};

type TLaunchDarklyUserCustomFields = {
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
  reason?: string;
};
type TParsedHttpAdapterFlag = Record<
  string,
  {
    value: boolean;
    reason?: string;
  }
>;

// This value is hard-coded here because we want to make sure that the
// app uses our account of LD. The value is meant to be public, so there
// is no need to be concerned about security.
const ldClientSideIdProduction = '5979d95f6040390cd07b5e01';

combineAdapters.combine([ldAdapter, httpAdapter]);

function getUserCustomFieldsForLaunchDarklyAdapter(
  user?: Props['user'],
  projectKey?: string
): TLaunchDarklyUserCustomFields {
  return {
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
const parseFlags = (fetchedFlags: TFetchedFlags): TParsedHttpAdapterFlag =>
  Object.fromEntries(
    fetchedFlags.allFeatures.map((fetchedFlag) => [
      fetchedFlag.name,
      {
        value: fetchedFlag.value,
        reason: fetchedFlag.reason,
      },
    ])
  );

export const SetupFlopFlipProvider = (props: Props) => {
  const apolloClient = useApolloClient();
  const allMenuFeatureToggles = useAllMenuFeatureToggles();
  const flags = React.useMemo(
    () => ({
      ...FLAGS,
      ...allMenuFeatureToggles.allFeatureToggles,
      ...props.flags,
    }),
    [allMenuFeatureToggles.allFeatureToggles, props.flags]
  );

  const defaultFlags = React.useMemo(
    () => ({
      ...FLAGS,
      ...allMenuFeatureToggles.allFeatureToggles,
      ...props.defaultFlags,
    }),
    [allMenuFeatureToggles.allFeatureToggles, props.defaultFlags]
  );

  const adapterArgs = React.useMemo(
    () => ({
      user: {
        key: props.user?.id,
      },
      memory: {
        user: {
          key: props.user?.id,
        },
      },
      launchdarkly: {
        sdk: {
          // Allow to overwrite the client ID, passed via the `additionalEnv` properties
          // of the application config.
          // This is mostly useful for internal usage on our staging environments.
          clientSideId: props.ldClientSideId ?? ldClientSideIdProduction,
        },
        flags,
        user: {
          key: props.user?.id,
          custom: getUserCustomFieldsForLaunchDarklyAdapter(
            props.user,
            props.projectKey
          ),
        },
      },
      http: {
        user: {
          key: props.user?.id,
        },
        execute: async function <TParsedHttpAdapterFlag>() {
          const response = await apolloClient.query<TAllFeaturesQuery>({
            query: AllFeaturesQuery,
            errorPolicy: 'ignore',
            context: {
              target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
            },
          });

          return parseFlags(response.data);
        },
        cacheIdentifier: 'local',
      },
    }),
    [apolloClient, flags, props.ldClientSideId, props.projectKey, props.user]
  );

  if (process.env.NODE_ENV === 'test') {
    const memoryAdapter = require('@flopflip/memory-adapter').default;
    return (
      <ConfigureFlopFlip<typeof memoryAdapter>
        adapter={memoryAdapter}
        adapterArgs={adapterArgs.memory}
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
