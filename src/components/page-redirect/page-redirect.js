import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export class LocationRedirect extends React.PureComponent {
  static displayName = 'LocationRedirect';
  static propTypes = {
    to: PropTypes.string.isRequired,
  };
  redirectTo = targetUrl => window.location.replace(targetUrl);
  componentDidMount() {
    this.redirectTo(this.props.to);
  }
  render() {
    return null;
  }
}

const PageRedirect = ({ reload, ...rest }) => {
  if (reload) return <LocationRedirect to={rest.to} />;
  return <Redirect {...rest} />;
};
PageRedirect.displayName = 'PageRedirect';
PageRedirect.propTypes = {
  reload: PropTypes.bool,
};
PageRedirect.defaultProps = {
  reload: false,
};
export default PageRedirect;
