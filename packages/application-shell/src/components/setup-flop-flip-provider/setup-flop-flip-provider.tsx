import React from 'react';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { Flags } from '@flopflip/types';
import { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import useAllMenuFeatureToggles from '../../hooks/use-all-menu-feature-toggles';
import { FLAGS } from '../../feature-toggles';

type Props = {
  projectKey?: string;
  user?: TFetchLoggedInUserQuery['user'];
  flags?: Flags;
  defaultFlags?: Flags;
  appEnv: string;
  children: React.ReactNode;
  shouldDeferAdapterConfiguration?: boolean;
};

// This value is hard-coded here because we want to make sure that the
// app uses our account of LD. The value is meant to be public, so there
// is no need to be concerned about security.
const ldClientSideIdProduction = '5979d95f6040390cd07b5e01';
// On our staging env we use a different ID, therefore we need to use the
// one above only for `production` environment.
const ldClientSideIdStaging = '5979d95f6040390cd07b5e00';

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
      clientSideId:
        props.appEnv === 'production'
          ? ldClientSideIdProduction
          : ldClientSideIdStaging,
      flags,
      user: {
        key: props.user && props.user.id,
        custom: {
          id: props.user && props.user.launchdarklyTrackingId,
          project: props.projectKey,
          team: props.user && props.user.launchdarklyTrackingTeam,
          group: props.user && props.user.launchdarklyTrackingGroup,
          subgroup: props.user && props.user.launchdarklyTrackingSubgroup,
          tenant: props.user && props.user.launchdarklyTrackingTenant,
        },
      },
    }),
    [flags, props.appEnv, props.projectKey, props.user]
  );

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
