import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { injectConfiguration } from '@commercetools-local/core/components/configuration';
import FetchUser from '../fetch-user';

class SetupFlopFlip extends React.PureComponent {
  static displayName = 'SetupFlopFlip';
  static propTypes = {
    ldClientSideId: PropTypes.string.isRequired,
    projectKey: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  createLaunchdarlyAdapterArgs = defaultMemoize(
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
      <FetchUser>
        {({ isLoading, user }) => (
          <ConfigureFlopFlip
            adapter={ldAdapter}
            adapterArgs={this.createLaunchdarlyAdapterArgs(
              this.props.ldClientSideId,
              user && user.id,
              user && user.launchdarklyTrackingId,
              user && user.launchdarklyTrackingGroup,
              this.props.projectKey
            )}
            shouldDeferAdapterConfiguration={isLoading}
          >
            {/* flop flip only accepts a single child :( */}
            <div>{this.props.children}</div>
          </ConfigureFlopFlip>
        )}
      </FetchUser>
    );
  }
}

export default injectConfiguration(
  ['tracking', 'ldClientSideId'],
  'ldClientSideId'
)(SetupFlopFlip);
