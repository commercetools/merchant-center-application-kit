import React from 'react';
import * as Sentry from '@sentry/browser';

export const stopTrackingUser = () => {
  if (window.app.trackingSentry) {
    Sentry.configureScope(scope => {
      scope.clear();
    });
  }
};

class SentryUserLogoutTracker extends React.Component {
  static displayName = 'SentryUserLogoutTracker';
  componentDidMount() {
    // When the user is not logged in anymore (e.g. on logout) we still track
    // errors but without the user data in context.
    stopTrackingUser();
  }
  render() {
    return null;
  }
}

export default SentryUserLogoutTracker;
