import React from 'react';
import PropTypes from 'prop-types';
import * as intercom from '../../utils/intercom';

/**
 * Whenever the user navigates to another route we need to let Intercom know
 * about this so it can tell us where the user is when talking to us. The
 * intercom library can get the URL on its own, so we simply need to call it
 * everytime we changed the route.
 */

class IntercomUrlTracker extends React.Component {
  static displayName = 'IntercomUrlTracker';
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  componentWillUpdate() {
    intercom.changePage();
  }
  render() {
    return this.props.children;
  }
}

export default IntercomUrlTracker;
