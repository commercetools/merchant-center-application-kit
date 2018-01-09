import React from 'react';
import * as gtm from '../../utils/gtm';

class GtmUserLogoutTracker extends React.Component {
  static displayName = 'GtmUserLogoutTracker';
  componentDidMount() {
    // When the user is not logged in anymore (e.g. on logout) we still track
    // page views but without the user data in context.
    gtm.removeUser();
  }
  render() {
    return null;
  }
}

export default GtmUserLogoutTracker;
