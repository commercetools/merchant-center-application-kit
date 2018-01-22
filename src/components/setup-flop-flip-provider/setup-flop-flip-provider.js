import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import { compose, setDisplayName } from 'recompose';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { injectConfiguration } from '@commercetools-local/core/components/configuration';

class SetupFlopFlip extends React.PureComponent {
  static displayName = 'SetupFlopFlip';
  static propTypes = {
    ldClientSideId: PropTypes.string.isRequired,
    projectKey: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      launchdarklyTrackingId: PropTypes.string.isRequired,
      launchdarklyTrackingGroup: PropTypes.string.isRequired,
    }),
    children: PropTypes.node.isRequired,
  };

  createLaunchdarklyAdapterArgs = defaultMemoize(
    (
      clientSideId,
      userId,
      ldTrackingId,
      ldTrackingGroup,
      ldTrackingProject
    ) => ({
      clientSideId,
      user: {
        key: userId,
        custom: {
          id: ldTrackingId,
          group: ldTrackingGroup,
          project: ldTrackingProject,
        },
      },
    })
  );

  render() {
    return (
      <ConfigureFlopFlip
        adapter={ldAdapter}
        adapterArgs={this.createLaunchdarklyAdapterArgs(
          this.props.ldClientSideId,
          this.props.user && this.props.user.id,
          this.props.user && this.props.user.launchdarklyTrackingId,
          this.props.user && this.props.user.launchdarklyTrackingGroup,
          this.props.projectKey
        )}
        shouldDeferAdapterConfiguration={this.props.isLoading}
      >
        {/* flop flip only accepts a single child :( */}
        <React.Fragment>{this.props.children}</React.Fragment>
      </ConfigureFlopFlip>
    );
  }
}

export default compose(
  setDisplayName('SetupFlopFlipProvider'),
  injectConfiguration(['tracking', 'ldClientSideId'], 'ldClientSideId')
)(SetupFlopFlip);
