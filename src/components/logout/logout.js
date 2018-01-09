import querystring from 'querystring';
import jwtDecode from 'jwt-decode';
import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import {
  ACCESS_TOKEN_NAMESPACE,
  ACCESS_TOKEN_IDP_URL_KEY,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
  LOGIN_STRATEGY_DEFAULT,
  LOGIN_STRATEGY_SSO,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import ShutdownIntercom from '../shutdown-intercom';
import SentryUserLogoutTracker from '../sentry-user-logout-tracker';
import GtmUserLogoutTracker from '../gtm-user-logout-tracker';

export const getLoginStrategy = () => {
  const accessToken = storage.get(CORE_STORAGE_KEYS.TOKEN);

  if (!accessToken) return null;
  let token;
  try {
    // If the access token is not a JWT or is malformed, this function will
    // throw an error, possibly putting the application into a wrong state.
    // If an error is thrown we just catch it and ignore it, resulting in the
    // "login strategy" to be set to default.
    token = jwtDecode(accessToken);
  } catch (e) {
    token = {};
  }
  return {}.hasOwnProperty.call(
    token,
    `${ACCESS_TOKEN_NAMESPACE}${ACCESS_TOKEN_IDP_URL_KEY}`
  )
    ? LOGIN_STRATEGY_SSO
    : LOGIN_STRATEGY_DEFAULT;
};

export class Logout extends React.PureComponent {
  static displayName = 'Logout';
  static propTypes = {
    location: PropTypes.shape({
      // Can contain following params:
      // - `reason`
      search: PropTypes.string.isRequired,
    }).isRequired,

    // Injected
    redirectTo: PropTypes.func.isRequired,
    loginStrategy: PropTypes.oneOf([
      LOGIN_STRATEGY_DEFAULT,
      LOGIN_STRATEGY_SSO,
    ]),
  };

  componentWillMount() {
    let redirectUrl;
    switch (this.props.loginStrategy) {
      case LOGIN_STRATEGY_SSO:
        redirectUrl = '/login/sso';
        break;
      default:
        redirectUrl = '/login';
    }

    const searchQuery = querystring.parse(
      this.props.location.search.substring(1)
    );
    const logoutReason = searchQuery.reason;
    if (logoutReason) redirectUrl = `${redirectUrl}?reason=${logoutReason}`;

    // Reset tracking, token, etc.
    // anonymizeSentry();
    // remove the access token from local storage
    storage.remove(CORE_STORAGE_KEYS.TOKEN);
    // NOTE: we need to ensure the cached projectKey is removed, because
    // the user can log in with another account and most likely he won't
    // access to the cached project.
    // storage.remove(APP_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
    // We simply redirect to a "new" browser page, instead of using the
    // history router. This will simplify a lot of things and avoid possible
    // problems like e.g. resetting the store/state.
    this.props.redirectTo(redirectUrl);
  }
  render() {
    return (
      <React.Fragment>
        <ShutdownIntercom />
        <SentryUserLogoutTracker />
        <GtmUserLogoutTracker />
      </React.Fragment>
    );
  }
}

export default withProps(() => ({
  loginStrategy: getLoginStrategy(),
  redirectTo: targetUrl => window.location.replace(targetUrl),
}))(Logout);
