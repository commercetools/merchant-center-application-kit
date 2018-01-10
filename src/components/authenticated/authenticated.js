import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { compose, setDisplayName, withProps } from 'recompose';
import {
  LOGOUT_REASONS,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';

export const Authenticated = props => {
  if (props.isLoggedIn) return props.children;

  // If the user tries to access a route (e.g. `/my-project/orders`)
  // and he's not logged in, we will be redirected to the login page
  // as usual but as soon as he logs in, he'll be redirected to the
  // location that he tried to access before. This is handled by the
  // query parameter `redirectTo`.
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
        pathname: '/logout',
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
  children: PropTypes.node.isRequired,
};

export default compose(
  setDisplayName('Authenticated'),
  withRouter,
  withProps(() => ({
    isLoggedIn: Boolean(storage.get(CORE_STORAGE_KEYS.TOKEN)),
  }))
)(Authenticated);
