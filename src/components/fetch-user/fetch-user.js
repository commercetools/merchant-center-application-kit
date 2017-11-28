import React from 'react';
import PropTypes from 'prop-types';
import { compose, getDisplayName, setDisplayName } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const LoggedInUserQuery = gql`
  query LoggedInUser {
    user: me {
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
  // Rename `loading` -> `isLoading`, to follow our naming convention
  // https://github.com/commercetools/merchant-center-frontend/issues/2701
  props: ({ userData }) => ({
    userData: {
      isLoading: userData.loading,
      error: userData.error,
      user: userData.user,
    },
  }),
};

// Correct, this is a FaaC component ;)
const FetchUser = props => props.children(props.userData);
FetchUser.displayName = 'FetchUser';
FetchUser.propTypes = {
  children: PropTypes.func.isRequired,
  // Injected
  userData: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    user: PropTypes.object, // see graphql query shape
  }).isRequired,
};

// React component
const FetchLoggedInUser = compose(
  setDisplayName('FetchUser'),
  graphql(LoggedInUserQuery, graphqlOptions)
)(FetchUser);

// HoC
const withUser = mapDataToProps => Component => {
  const WrappedWithUser = props => (
    <FetchLoggedInUser>
      {userData => {
        const mappedProps = mapDataToProps
          ? mapDataToProps(userData)
          : userData;
        return <Component {...props} {...mappedProps} />;
      }}
    </FetchLoggedInUser>
  );
  WrappedWithUser.displayName = `withUser(${getDisplayName(Component)})`;
  return WrappedWithUser;
};

// Public exports
export default FetchLoggedInUser;
export { withUser };

// For testing
export { LoggedInUserQuery, FetchUser };
