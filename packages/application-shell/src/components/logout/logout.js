import React from 'react';
import PropTypes from 'prop-types';
import { SentryUserLogoutTracker } from '@commercetools-frontend/sentry';
import * as storage from '@commercetools-frontend/storage';
import {
  LOGIN_STRATEGY_DEFAULT,
  LOGIN_STRATEGY_SSO,
  STORAGE_KEYS,
} from '../../constants';
import GtmUserLogoutTracker from '../gtm-user-logout-tracker';

export const getLoginStrategy = () => {
  const loginStrategy = storage.get(STORAGE_KEYS.LOGIN_STRATEGY);
  return loginStrategy === LOGIN_STRATEGY_SSO
    ? LOGIN_STRATEGY_SSO
    : LOGIN_STRATEGY_DEFAULT;
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
  };

  redirectTo = targetUrl => window.location.replace(targetUrl);

  componentDidMount() {
    let redirectUrl;
    const loginStrategy = getLoginStrategy();
    switch (loginStrategy) {
      case LOGIN_STRATEGY_SSO:
        redirectUrl = '/login/sso';
        break;
      default:
        redirectUrl = '/login';
    }

    // The user is no longer authenticated.
    storage.remove(STORAGE_KEYS.IS_AUTHENTICATED);
    storage.remove(STORAGE_KEYS.LOGIN_STRATEGY);
    // NOTE: we need to ensure the cached projectKey is removed, because
    // the user can log in with another account and most likely he won't
    // access to the cached project.
    storage.remove(STORAGE_KEYS.ACTIVE_PROJECT_KEY);
    // We simply redirect to a "new" browser page, instead of using the
    // history router. This will simplify a lot of things and avoid possible
    // problems like e.g. resetting the store/state.
    this.redirectTo(redirectUrl + this.props.location.search);
  }
  render() {
    return (
      <React.Fragment>
        <SentryUserLogoutTracker />
        <GtmUserLogoutTracker />
      </React.Fragment>
    );
  }
}

export default Logout;
