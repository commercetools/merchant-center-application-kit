// @flow strict
import * as React from 'react';
import * as sentry from '../sentry';

type Props = {
  user?: sentry.User,
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
    if (this.props.user) this.syncUser();
  }
  componentDidUpdate() {
    if (this.props.user) this.syncUser();
  }
  syncUser = () => {
    sentry.updateUser(this.props.user);
  };
  render() {
    return null;
  }
}

export default SentryUserTracker;
