import React from 'react';
import PropTypes from 'prop-types';
import { withUser } from '../fetch-user';
import * as gtm from '../../utils/gtm';

/**
 * This component will let gtm know if any information about the user has
 * changed.
 */

export class GtmUserTracker extends React.Component {
  static displayName = 'GtmUserTracker';
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
      this.updateUser(this.props.userData.user);
    }
  }
  componentWillUpdate(nextProps) {
    // call in componentWillUpdate rather than in componentWillReceiveProps
    // because willUpdate will only run if shouldComponentUpdate returned true
    // componentWillReceiveProps will always run
    if (this.shouldUpdateUser(nextProps.userData)) {
      this.updateUser(nextProps.userData.user);
    }
  }
  shouldUpdateUser = userData => !userData.isLoading;
  updateUser = user => {
    gtm.updateUser(user);
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
}))(GtmUserTracker);
