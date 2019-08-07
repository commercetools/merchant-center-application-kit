import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { STORAGE_KEYS } from '../../constants';
import AmILoggedInQuery from './authenticated.graphql';

const hasCachedAuthenticationState = () =>
  window.localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';

const AmILoggedIn = props => {
  // ...otherwise, we ping a "secured" endpoint in the MC API to see if there is
  // a valid access token. If we get an error, we assume that the user is not
  // authenticated. If we don't get any error, the access token sent with the cookie
  // is valid. We return null while the query is loading.
  const { data, loading, error } = useQuery(AmILoggedInQuery, {
    variables: { target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND },
    onCompleted: data => {
      if (!data) {
        // In case the request is 200 but there is no data, we assume
        // there are some errors.
        window.localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
      } else {
        // Even though the login page might set this flag, we just make sure that
        // we do it here as well. This will help in the future when we eventually
        // move the auth service to itw own domain, in which case the local storage
        // is not shared anymore.
        window.localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, true);
      }
    },
    onError: () => {
      // The query fails without the `mcAccessToken`. In this case the caching
      // needs to be unset as otherwise the application will end up in a infinte
      // redirect loop.
      window.localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
    },
  });
  if (error) {
    // No matter what error, we consider it as a failed authentication
    return props.render({ isAuthenticated: false });
  }
  if (!loading && data && data.amILoggedIn) {
    return props.render({ isAuthenticated: true });
  }
  return null;
};
AmILoggedIn.displayName = 'AmILoggedIn';
AmILoggedIn.propTypes = {
  render: PropTypes.func.isRequired,
};

const Authenticated = props => {
  // We attempt to see if the user was already authenticated by looking
  // at the "cached" flag in local storage.
  const cachedAuthenticationState = hasCachedAuthenticationState();
  if (cachedAuthenticationState) {
    return props.render({ isAuthenticated: true });
  }

  return <AmILoggedIn {...props} />;
};
Authenticated.displayName = 'Authenticated';
Authenticated.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Authenticated;
