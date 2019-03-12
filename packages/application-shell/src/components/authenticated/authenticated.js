import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import * as storage from '@commercetools-frontend/storage';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { STORAGE_KEYS } from '../../constants';
import AmILoggedInQuery from './authenticated.graphql';

const hasCachedAuthenticationState = () =>
  storage.get(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';

const Authenticated = props => {
  // We attempt to see if the user was already authenticated by looking
  // at the "cached" flag in local storage.
  const cachedAuthenticationState = hasCachedAuthenticationState();
  if (cachedAuthenticationState) {
    return props.render({ isAuthenticated: true });
  }

  // ...otherwise, we ping a "secured" endpoint in the MC API to see if there is
  // a valid access token. If we get an error, we assume that the user is not
  // authenticated. If we don't get any error, the access token sent with the cookie
  // is valid. We return null while the query is loading.
  return (
    <Query
      query={AmILoggedInQuery}
      variables={{ target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND }}
      onCompleted={() => {
        // Even though the login page might set this flag, we just make sure that
        // we do it here as well. This will help in the future when we eventually
        // move the auth service to itw own domain, in which case the local storage
        // is not shared anymore.
        storage.put(STORAGE_KEYS.IS_AUTHENTICATED, true);
      }}
    >
      {({ loading, data, error }) => {
        if (error) {
          console.error(error);
          return props.render({ isAuthenticated: false });
        }
        if (!loading && data && data.amILoggedIn) {
          return props.render({ isAuthenticated: true });
        }
        return null;
      }}
    </Query>
  );
};
Authenticated.displayName = 'Authenticated';
Authenticated.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Authenticated;
