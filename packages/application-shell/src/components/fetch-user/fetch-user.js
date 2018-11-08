import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  getDisplayName,
  setDisplayName,
  shouldUpdate,
} from 'recompose';
import { deepEqual } from 'fast-equals';
import { graphql } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import deprecateComponent from '../../from-core/deprecate-component';
import LoggedInUserQuery from './fetch-user.graphql';

const graphqlOptions = {
  alias: 'withUser',
  name: 'userData',
  options: {
    variables: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
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
  graphql(LoggedInUserQuery, graphqlOptions),
  // a render is triggered because the reference of the userData prop changes
  // although the objects content didn't change
  shouldUpdate((props, nextProps) => !deepEqual(props, nextProps))
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

// Exports with deprecated warnings
const DeprecatedFetchUser = deprecateComponent({
  message:
    'The "FetchUser" component has been deprecated and will be removed in the next major release. Please use "GetApplicationContext" from `@commercetools-frontend/application-shell-connectors` to access "user" and "project" information.',
})(FetchLoggedInUser);
const deprecatedWithUser = mapDataToProps => Component => {
  const WrappedComponent = withUser(mapDataToProps)(Component);
  return deprecateComponent({
    message:
      'The "withUser" HOC has been deprecated and will be removed in the next major release. Please use "withApplicationContext" from `@commercetools-frontend/application-shell-connectors` to access "user" and "project" information.',
  })(WrappedComponent);
};
export { DeprecatedFetchUser, deprecatedWithUser };
