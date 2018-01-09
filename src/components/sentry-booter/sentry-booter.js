import React from 'react';
import PropTypes from 'prop-types';
import * as sentry from '../../utils/sentry';

class SentryBooter extends React.Component {
  static displayName = 'SentryBooter';
  static propTypes = {
    children: PropTypes.node,
  };
  static defaultProps = {
    children: null,
  };
  componentDidMount() {
    // We don't need any user data to start using Sentry, for example for
    // tracking errors when the user is not logged in.
    sentry.boot();
  }
  render() {
    return this.props.children;
  }
}

export default SentryBooter;
