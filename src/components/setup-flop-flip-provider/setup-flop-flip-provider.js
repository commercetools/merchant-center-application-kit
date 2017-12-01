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
    {({ isFetching, user }) => (
      <ConfigureFlopFlip
        adapter={ldAdapter}
        adapterArgs={
          !isFetching &&
          createLaunchdarlyAdapterArgs(
            props.ldClientSideId,
            user.id,
            user.launchdarklyTrackingId,
            user.launchdarklyTrackingGroup,
            props.projectKey
          )
        }
        shouldDeferAdapterConfiguration={isFetching}
      >
        {props.children}
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
