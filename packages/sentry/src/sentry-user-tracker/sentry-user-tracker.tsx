import React from 'react';
import * as Sentry from '@sentry/browser';

type SentryUser = {
  id: string;
  email: string;
};
type Props = {
  user?: SentryUser;
};

/**
 * This component will let sentry know if any information about the user has
 * changed.
 */

class SentryUserTracker extends React.PureComponent<Props> {
  static displayName = 'SentryUserTracker';
  componentDidMount() {
    // since the user and project could have been loaded from the apollo cache
    // they could be preset already when mounting
    this.syncUser();
  }
  componentDidUpdate() {
    this.syncUser();
  }
  syncUser = () => {
    if (this.props.user && window.app.trackingSentry) {
      // to avoid sending personal data to sentry we anonymize the email address
      // by only sending the domain part or the email
      const emailTld = this.props.user.email.split('@')[1];
      Sentry.setUser({
        email: `xxx@${emailTld}`,
        id: this.props.user.id,
      });
    }
  };
  render() {
    return null;
  }
}

export default SentryUserTracker;
