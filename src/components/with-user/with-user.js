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
  options: {
    variables: {
      target: 'mc',
    },
  },
};

const WithUser = props => {
  const mappedProps = props.mapDataToProps
    ? props.mapDataToProps(props.userData)
    : props.userData;
  return props.children(mappedProps);
};
WithUser.displayName = 'WithUser';
WithUser.propTypes = {
  mapDataToProps: PropTypes.func,
  children: PropTypes.func.isRequired,
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
    <WithUserData mapDataToProps={mapDataToProps}>
      {mappedProps => <Component {...props} {...mappedProps} />}
    </WithUserData>
  );
  WrappedWithUser.displayName = 'WithUser';
  return WrappedWithUser;
};

// Public exports
export default WithUserData;
export { withUser };

// For testing
export { LoggedInUserQuery, WithUser };
