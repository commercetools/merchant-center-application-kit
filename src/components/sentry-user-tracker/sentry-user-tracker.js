import React from 'react';
import PropTypes from 'prop-types';
import { withUser } from '../fetch-user';
import * as sentry from '../../utils/sentry';

/**
 * This component will let sentry know if any information about the user has
 * changed.
 */

export class SentryUserTracker extends React.Component {
  static displayName = 'SentryUserTracker';
  static propTypes = {
    userData: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      user: PropTypes.object,
    }),
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.userData.user !== this.props.userData.user;
  }
  componentDidMount() {
    // since the user and project could have been loaded from the apollo cache
    // they could be preset already when mounting
    if (this.shouldUpdateUser(this.props.userData)) {
      this.updateUser(this.props.userData);
    }
  }
  componentWillUpdate(nextProps) {
    // call in componentWillUpdate rather than in componentWillReceiveProps
    // because willUpdate will only run if shouldComponentUpdate returned true
    // componentWillReceiveProps will always run
    if (this.shouldUpdateUser(nextProps.userData)) {
      this.updateUser(nextProps.userData);
    }
  }
  shouldUpdateUser = userData => !userData.isLoading;
  updateUser = userData => {
    sentry.updateUser(userData.user);
  };
  render() {
    return null;
  }
}

export default withUser(userData => ({
  userData: {
    isLoading: userData.isLoading,
    user: userData.user,
  },
}))(SentryUserTracker);
