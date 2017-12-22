import React from 'react';
import PropTypes from 'prop-types';
import * as intercom from '../../utils/intercom';

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
