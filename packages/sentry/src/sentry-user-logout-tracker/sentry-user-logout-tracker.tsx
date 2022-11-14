import type { ApplicationWindow } from '@commercetools-frontend/constants';

import { Component } from 'react';
import * as Sentry from '@sentry/react';

declare let window: ApplicationWindow;

class SentryUserLogoutTracker extends Component {
  static displayName = 'SentryUserLogoutTracker';
  componentDidMount() {
    // When the user is not logged in anymore (e.g. on logout) we still track
    // errors but without the user data in context.
    if (window.app.trackingSentry) {
      Sentry.configureScope((scope) => {
        scope.clear();
      });
    }
  }
  render() {
    return null;
  }
}

export default SentryUserLogoutTracker;
