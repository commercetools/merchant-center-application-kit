import React from 'react';
import PropTypes from 'prop-types';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import useAllMenuFeatureToggles from '../../hooks/use-all-menu-feature-toggles';
import { FLAGS } from '../../feature-toggles';

// This value is hard-coded here because we want to make sure that the
// app uses our account of LD. The value is meant to be public, so there
// is no need to be concerned about security.
const ldClientSideIdProduction = '5979d95f6040390cd07b5e01';
// On our staging env we use a different ID, therefore we need to use the
// one above only for `production` environment.
const ldClientSideIdStaging = '5979d95f6040390cd07b5e00';

export const SetupFlopFlipProvider = props => {
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
        this.props.appEnv === 'production'
          ? ldClientSideIdProduction
          : ldClientSideIdStaging,
      userId: props.user && props.user.id,
      projectKey: props.projectKey,
      flags,
      ldTrackingId: props.user && props.user.launchdarklyTrackingId,
      ldTrackingGroup: props.user && props.user.launchdarklyTrackingGroup,
      ldTrackingTeam: props.user && props.user.launchdarklyTrackingTeam,
      ldTrackingTenant: props.user && props.user.launchdarklyTrackingTenant,
    }),
    [flags, props.projectKey, props.user]
  );

  return (
    <ConfigureFlopFlip
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
SetupFlopFlipProvider.propTypes = {
  projectKey: PropTypes.string,
  user: PropTypes.oneOfType([
    PropTypes.shape({
      launchdarklyTrackingTenant: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      launchdarklyTrackingId: PropTypes.string.isRequired,
      launchdarklyTrackingGroup: PropTypes.string.isRequired,
      launchdarklyTrackingTeam: PropTypes.array.isRequired,
      launchdarklyTrackingTenant: PropTypes.string.isRequired,
    }),
  ]),
  flags: PropTypes.object,
  defaultFlags: PropTypes.object,
  appEnv: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  shouldDeferAdapterConfiguration: PropTypes.bool,
};

export default SetupFlopFlipProvider;
