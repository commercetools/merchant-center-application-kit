import React from 'react';
import * as intercom from '../../utils/intercom';

/**
 * When the user logs out of the MC we need to clear his Intercom session so
 * that nobody else using the same computer can look at the user's
 * conversations.
 */

class ShutdownIntercom extends React.Component {
  static displayName = 'ShutdownIntercom';
  componentDidMount() {
    intercom.shutdown();
  }
  render() {
    return null;
  }
}

export default ShutdownIntercom;
