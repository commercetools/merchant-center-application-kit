import React from 'react';
import * as intercom from '../../utils/intercom';

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
