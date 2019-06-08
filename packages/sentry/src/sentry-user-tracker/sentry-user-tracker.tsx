import React from 'react';
import * as PropTypes from 'prop-types';
import { InferPropTypes } from '../type-utils';
import * as sentry from '../sentry';

const userTrackerPropTypes = {
  user: PropTypes.shape(sentry.userPropTypes),
};

type UserTrackerProps = InferPropTypes<typeof userTrackerPropTypes>;

/**
 * This component will let sentry know if any information about the user has
 * changed.
 */

class SentryUserTracker extends React.PureComponent<UserTrackerProps> {
  static displayName = 'SentryUserTracker';
  static propTypes = userTrackerPropTypes;
  componentDidMount() {
    // since the user and project could have been loaded from the apollo cache
    // they could be preset already when mounting
    this.syncUser();
  }
  componentDidUpdate() {
    this.syncUser();
  }
  syncUser = () => {
    if (this.props.user) {
      sentry.updateUser(this.props.user);
    }
  };
  render() {
    return null;
  }
}

export default SentryUserTracker;
