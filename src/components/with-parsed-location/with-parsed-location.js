import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';

export default Component => {
  const WrappedWithParsedLocation = ownProps => {
    const locationSearch = ownProps.location.search;
    const locationHash = ownProps.location.hash;
    const parsedLocationProps = {
      ...(locationSearch ? querystring.parse(locationSearch.substring(1)) : {}),
      ...(locationHash ? querystring.parse(locationHash.substring(1)) : {}),
    };
    return <Component {...ownProps} locationParams={parsedLocationProps} />;
  };
  WrappedWithParsedLocation.displayName = `withParsedLocation(${getDisplayName(
    Component
  )})`;
  WrappedWithParsedLocation.propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  };
  return WrappedWithParsedLocation;
};
