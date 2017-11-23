import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const LoggedInUserQuery = gql`
  query LoggedInUser {
    me {
      id
      createdAt
      version
      email
      firstName
      lastName
      language
      numberFormat
      timeZone
      tracking_intercom
      intercom_user_hash
      launchdarklyTrackingId
      launchdarklyTrackingGroup
      availableProjects {
        key
        name
        suspended
        expired
      }
      availableOrganizations {
        name
      }
    }
  }
`;

const graphqlOptions = {
  alias: 'withUser',
  name: 'userData',
};

const WithUser = props => {
  const { mapDataToProps, render, userData, ...parentProps } = props;
  const mappedProps = mapDataToProps ? mapDataToProps(userData) : { userData };
  return props.render({ ...parentProps, ...mappedProps });
};
WithUser.displayName = 'WithUser';
WithUser.propTypes = {
  mapDataToProps: PropTypes.func,
  render: PropTypes.func.isRequired,
  // Injected
  userData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    me: PropTypes.object, // see graphql query shape
  }).isRequired,
};

// React component
const WithUserData = compose(
  setDisplayName('WithUser'),
  graphql(LoggedInUserQuery, graphqlOptions)
)(WithUser);

// HoC
const withUser = mapDataToProps => Component => {
  const WrappedWithUser = props => (
    <WithUserData
      mapDataToProps={mapDataToProps}
      render={mappedProps => <Component {...props} {...mappedProps} />}
    />
  );
  WrappedWithUser.displayName = 'WithUser';
  return WrappedWithUser;
};

// Public exports
export default WithUserData;
export { withUser };

// For testing
export { LoggedInUserQuery, WithUser };
