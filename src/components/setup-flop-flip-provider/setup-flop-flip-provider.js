import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import ldAdapter from '@flopflip/launchdarkly-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { injectConfiguration } from '@commercetools-local/core/components/configuration';
import FetchUser from '../fetch-user';

const createLaunchdarlyAdapterArgs = defaultMemoize(
  (clientSideId, userId, ldTrackingId, ldTrackingGroup, ldTrackingProject) => ({
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

const SetupFlopFlip = props => (
  <FetchUser>
    {({ isLoading, user }) => (
      <ConfigureFlopFlip
        adapter={ldAdapter}
        adapterArgs={createLaunchdarlyAdapterArgs(
          props.ldClientSideId,
          user && user.id,
          user && user.launchdarklyTrackingId,
          user && user.launchdarklyTrackingGroup,
          props.projectKey
        )}
        shouldDeferAdapterConfiguration={isLoading}
      >
        {/* flop flip only accepts a single child :( */}
        <div>{props.children}</div>
      </ConfigureFlopFlip>
    )}
  </FetchUser>
);

SetupFlopFlip.displayName = 'SetupFlopFlip';

SetupFlopFlip.propTypes = {
  ldClientSideId: PropTypes.string.isRequired,
  projectKey: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default injectConfiguration(
  ['tracking', 'ldClientSideId'],
  'ldClientSideId'
)(SetupFlopFlip);
