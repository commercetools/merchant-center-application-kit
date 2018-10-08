import React from 'react';
import PropTypes from 'prop-types';
import * as sentry from '../sentry';

/**
 * This component will let sentry know if any information about the user has
 * changed.
 */

class SentryUserTracker extends React.PureComponent {
  static displayName = 'SentryUserTracker';
  static propTypes = {
    user: PropTypes.object,
  };
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
