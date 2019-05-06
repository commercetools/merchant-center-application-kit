// @flow strict
import * as React from 'react';
import * as sentry from '../sentry';

type Props = {};

class SentryUserLogoutTracker extends React.Component<Props> {
  static displayName = 'SentryUserLogoutTracker';
  componentDidMount() {
    // When the user is not logged in anymore (e.g. on logout) we still track
    // errors but without the user data in context.
    sentry.stopTrackingUser();
  }
  render() {
    return null;
  }
}

export default SentryUserLogoutTracker;
