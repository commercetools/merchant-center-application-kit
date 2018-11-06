import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';

// This value is hard-coded here because we want to make sure that the
// app uses our account of LD. The value is meant to be public, so there
// is no need to be concerned about security.
const ldClientSideIdProduction = '5979d95f6040390cd07b5e01';
// On our staging env we use a different ID, therefore we need to use the
// one above only for `production` environment.
const ldClientSideIdStaging = '5979d95f6040390cd07b5e00';

export const getFlopflipReconfiguration = defaultMemoize(projectKey => ({
  custom: { project: projectKey },
}));

export class SetupFlopFlipProvider extends React.PureComponent {
  static displayName = 'SetupFlopFlipProvider';
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      launchdarklyTrackingId: PropTypes.string.isRequired,
      launchdarklyTrackingGroup: PropTypes.string.isRequired,
      launchdarklyTrackingTeam: PropTypes.array.isRequired,
      launchdarklyTrackingTenant: PropTypes.string.isRequired,
    }),
    defaultFlags: PropTypes.object,
    appEnv: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  createLaunchdarklyAdapterArgs = defaultMemoize(
    (
      clientSideId,
      userId,
      ldTrackingId,
      ldTrackingGroup,
      ldTrackingTeam,
      ldTrackingTenant
    ) => ({
      clientSideId,
      user: {
        key: userId,
        custom: {
          id: ldTrackingId,
          team: ldTrackingTeam,
          group: ldTrackingGroup,
          tenant: ldTrackingTenant,
        },
      },
    })
  );

  render() {
    return (
      <ConfigureFlopFlip
        adapter={ldAdapter}
        adapterArgs={this.createLaunchdarklyAdapterArgs(
          this.props.appEnv === 'production'
            ? ldClientSideIdProduction
            : ldClientSideIdStaging,
          this.props.user && this.props.user.id,
          this.props.user && this.props.user.launchdarklyTrackingId,
          this.props.user && this.props.user.launchdarklyTrackingGroup,
          this.props.user && this.props.user.launchdarklyTrackingTeam,
          this.props.user && this.props.user.launchdarklyTrackingTenant
        )}
        defaultFlags={this.props.defaultFlags}
        shouldDeferAdapterConfiguration={!this.props.user}
      >
        {this.props.children}
      </ConfigureFlopFlip>
    );
  }
}

export default SetupFlopFlipProvider;
