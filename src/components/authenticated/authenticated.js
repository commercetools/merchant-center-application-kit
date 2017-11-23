import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose, setDisplayName, withProps } from 'recompose';
import {
  LOGOUT_REASONS,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';

// TODO:
// * enable `anonymizeSentry` when `tracking.js` is moved to app-shell
// * enable `storage.remove(APP_STORAGE_KEYS.ACTIVE_PROJECT_KEY)` when
//   `app/constants` are moved to app-shell (or to `@commercetools-local/constants`)
export const Authenticated = props => {
  if (props.isLoggedIn) return props.children;

  // anonymizeSentry();

  // NOTE: we need to ensure the cached projectKey is removed, because
  // the user can log in with another account and most likely he won't
  // access to the cached project.
  // However, if the user tries to access a route (e.g. `/my-project/orders`)
  // and he's not logged in, we will be redirected to the login page
  // as usual but as soon as he logs in, he'll be redirected to the
  // location that he tried to access before. This is handled by the
  // query parameter `redirectTo`. For that we don't need the
  // `activeProjectKey` value, so it's fine to remove it.
  // storage.remove(APP_STORAGE_KEYS.ACTIVE_PROJECT_KEY);

  const searchQuery = querystring.stringify({
    reason: LOGOUT_REASONS.UNAUTHORIZED,
    // This will be used after being logged in,
    // to redirect to this location.
    ...(props.location.pathname === '/'
      ? {}
      : { redirectTo: props.location.pathname }),
  });
  return (
    <Redirect
      to={{
        pathname: '/login',
        search: `?${searchQuery}`,
      }}
    />
  );
};
Authenticated.displayName = 'Authenticated';
Authenticated.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default compose(
  setDisplayName('Authenticated'),
  withProps(() => ({
    isLoggedIn: Boolean(storage.get(CORE_STORAGE_KEYS.TOKEN)),
  }))
)(Authenticated);
