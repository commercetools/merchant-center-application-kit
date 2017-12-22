import React from 'react';
import PropTypes from 'prop-types';
import * as intercom from '../../utils/intercom';

/**
 * When the user logs out of the MC we need to clear his Intercom session so
 * that nobody else using the same computer can look at the user's
 * conversations.
 */

class ShutdownIntercom extends React.Component {
  static displayName = 'ShutdownIntercom';
  static propTypes = {
    children: PropTypes.node,
  };
  defaultProps = {
    children: null,
  };
  componentDidMount() {
    intercom.shutdown();
  }
  render() {
    return this.props.children;
  }
}

export default ShutdownIntercom;
