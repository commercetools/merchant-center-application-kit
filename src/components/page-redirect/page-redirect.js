import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export class LocationRedirect extends React.PureComponent {
  static displayName = 'LocationRedirect';
  static propTypes = {
    to: PropTypes.string.isRequired,
  };
  redirectTo = () => window.location.replace(this.props.to);
  componentDidMount() {
    this.redirectTo();
  }
  render() {
    return null;
  }
}

const PageRedirect = ({ forceReload, ...rest }) => {
  if (forceReload)
    return <Route render={() => <LocationRedirect to={rest.to} />} />;
  return <Redirect {...rest} />;
};
PageRedirect.displayName = 'PageRedirect';
PageRedirect.propTypes = {
  forceReload: PropTypes.bool,
};
PageRedirect.defaultProps = {
  forceReload: false,
};
export default PageRedirect;
