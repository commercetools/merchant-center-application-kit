import React from 'react';
import PropTypes from 'prop-types';
import { encode } from 'qss';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';

class Redirector extends React.PureComponent {
  static displayName = 'Redirector';
  static propTypes = {
    to: PropTypes.string.isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        reason: PropTypes.oneOf(Object.values(LOGOUT_REASONS)).isRequired,
      }),
    }).isRequired,
    environment: PropTypes.shape({
      servedByProxy: PropTypes.bool.isRequired,
    }).isRequired,
    queryParams: PropTypes.shape({
      reason: PropTypes.oneOf(Object.values(LOGOUT_REASONS)).isRequired,
      redirectTo: PropTypes.string,
    }).isRequired,
  };
  static defaultProps = {
    location: {},
  };
  redirectTo = targetUrl => window.location.replace(targetUrl);
  componentDidMount() {
    // For now the authentication service runs on the same domain as the application,
    // even on development (using the webpack dev server).
    const authUrl = window.location.origin;

    const searchQuery = {
      ...this.props.queryParams,
      ...(this.props.location.query || {}),
    };

    this.redirectTo(`${authUrl}/${this.props.to}?${encode(searchQuery)}`);
  }
  render() {
    return null;
  }
}

export default Redirector;
