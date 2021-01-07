import type { TFlags } from '@flopflip/types';
import type { TFetchLoggedInUserQuery } from '../../types/generated/mc';

import React from 'react';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import omitEmpty from 'omit-empty-es';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import useAllMenuFeatureToggles from '../../hooks/use-all-menu-feature-toggles';
import { FLAGS } from '../../feature-toggles';

type Props = {
  projectKey?: string;
  user?: TFetchLoggedInUserQuery['user'];
  flags?: TFlags;
  defaultFlags?: TFlags;
  ldClientSideId?: string;
  children: React.ReactNode;
  shouldDeferAdapterConfiguration?: boolean;
};

type CustomLDUser = {
  project: string;
  id: string;
  team: string[];
  group: string;
  subgroup: string;
  tenant: string;
};

// This value is hard-coded here because we want to make sure that the
// app uses our account of LD. The value is meant to be public, so there
// is no need to be concerned about security.
const ldClientSideIdProduction = '5979d95f6040390cd07b5e01';

export const SetupFlopFlipProvider = (props: Props) => {
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
      sdk: {
        // Allow to overwrite the client ID, passed via the `additionalEnv` properties
        // of the application config.
        // This is mostly useful for internal usage on our staging environments.
        clientSideId: props.ldClientSideId ?? ldClientSideIdProduction,
      },
      flags,
      user: {
        key: props.user?.id,
        custom: omitEmpty<CustomLDUser, Partial<CustomLDUser>>({
          id: props.user?.launchdarklyTrackingId,
          project: props.projectKey,
          team: props.user?.launchdarklyTrackingTeam,
          group: props.user?.launchdarklyTrackingGroup,
          subgroup: props.user?.launchdarklyTrackingSubgroup,
          tenant: props.user?.launchdarklyTrackingTenant,
        }),
      },
    }),
    [flags, props.ldClientSideId, props.projectKey, props.user]
  );

  if (process.env.NODE_ENV === 'test') {
    const memoryAdapter = require('@flopflip/memory-adapter').default;
    return (
      <ConfigureFlopFlip<typeof memoryAdapter>
        adapter={memoryAdapter}
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
  }

  return (
    <ConfigureFlopFlip<typeof ldAdapter>
      adapter={ldAdapter}
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
