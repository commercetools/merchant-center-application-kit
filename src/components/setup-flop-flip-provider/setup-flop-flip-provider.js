import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import { compose, setDisplayName } from 'recompose';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { injectConfiguration } from '@commercetools-local/core/components/configuration';

export class SetupFlopFlipProvider extends React.PureComponent {
  static displayName = 'SetupFlopFlipProvider';
  static propTypes = {
    ldClientSideId: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      launchdarklyTrackingId: PropTypes.string.isRequired,
      launchdarklyTrackingGroup: PropTypes.string.isRequired,
    }),
    children: PropTypes.func.isRequired,
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

  setProjectKey = defaultMemoize(projectKey => {
    const updatedAdapterArgs = this.createLaunchdarklyAdapterArgs(
      this.props.ldClientSideId,
      this.props.user && this.props.user.id,
      this.props.user && this.props.user.launchdarklyTrackingId,
      this.props.user && this.props.user.launchdarklyTrackingGroup,
      projectKey
    );
    ldAdapter.updateUserContext(updatedAdapterArgs.user);
  });

  render() {
    return (
      <ConfigureFlopFlip
        adapter={ldAdapter}
        adapterArgs={this.createLaunchdarklyAdapterArgs(
          this.props.ldClientSideId,
          this.props.user && this.props.user.id,
          this.props.user && this.props.user.launchdarklyTrackingId,
          this.props.user && this.props.user.launchdarklyTrackingGroup
        )}
        shouldDeferAdapterConfiguration={!this.props.user}
      >
        {this.props.children({ setProjectKey: this.setProjectKey })}
      </ConfigureFlopFlip>
    );
  }
}

export default compose(
  setDisplayName('SetupFlopFlipProvider'),
  injectConfiguration(['tracking', 'ldClientSideId'], 'ldClientSideId')
)(SetupFlopFlipProvider);
