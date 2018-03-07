import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import {
  STORAGE_KEYS as CORE_STORAGE_KEYS,
  LOGIN_STRATEGY_DEFAULT,
  LOGIN_STRATEGY_SSO,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import ShutdownIntercom from '../shutdown-intercom';
import SentryUserLogoutTracker from '../sentry-user-logout-tracker';
import GtmUserLogoutTracker from '../gtm-user-logout-tracker';

export const getLoginStrategy = () => {
  const idpUrl = storage.get(CORE_STORAGE_KEYS.IDENTITY_PROVIDER_URL);
  return idpUrl ? LOGIN_STRATEGY_SSO : LOGIN_STRATEGY_DEFAULT;
};

export class Logout extends React.PureComponent {
  static displayName = 'Logout';
  static propTypes = {
    location: PropTypes.shape({
      // Can contain following params:
      // - `reason`
      // - `redirectTo`
      search: PropTypes.string.isRequired,
    }).isRequired,

    // Injected
    redirectTo: PropTypes.func.isRequired,
    loginStrategy: PropTypes.oneOf([
      LOGIN_STRATEGY_DEFAULT,
      LOGIN_STRATEGY_SSO,
    ]),
  };

  componentDidMount() {
    let redirectUrl;
    switch (this.props.loginStrategy) {
      case LOGIN_STRATEGY_SSO:
        redirectUrl = '/login/sso';
        break;
      default:
        redirectUrl = '/login';
    }

    // remove the access token from local storage
    // #cookie
    storage.remove(CORE_STORAGE_KEYS.TOKEN);
    // The user is no longer authenticated.
    storage.remove(CORE_STORAGE_KEYS.IS_AUTHENTICATED);
    // NOTE: we need to ensure the cached projectKey is removed, because
    // the user can log in with another account and most likely he won't
    // access to the cached project.
    storage.remove(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
    // We simply redirect to a "new" browser page, instead of using the
    // history router. This will simplify a lot of things and avoid possible
    // problems like e.g. resetting the store/state.
    this.props.redirectTo(redirectUrl + this.props.location.search);
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
