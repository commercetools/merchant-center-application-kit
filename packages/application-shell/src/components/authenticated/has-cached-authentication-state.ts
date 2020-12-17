import type { ApplicationWindow } from '@commercetools-frontend/constants';

import { STORAGE_KEYS } from '../../constants';
import { buildOidcScope } from './helpers';

declare let window: ApplicationWindow;

const hasCachedAuthenticationState = (): boolean => {
  const cachedSessionToken = window.sessionStorage.getItem(
    STORAGE_KEYS.SESSION_TOKEN
  );
  if (cachedSessionToken && window.app.__DEVELOPMENT__) {
    try {
      const cachedScope = window.sessionStorage.getItem(
        STORAGE_KEYS.SESSION_SCOPE
      );
      // Force the user to log in again
      if (!cachedScope) {
        return false;
      }
      const activeProjectKey = window.localStorage.getItem(
        STORAGE_KEYS.ACTIVE_PROJECT_KEY
      );
      // Force the user to log in again
      if (!activeProjectKey) {
        // Here we store the initial project key in local storage,
        // so that it gets picked up when we initiate the login flow.
        window.localStorage.setItem(
          STORAGE_KEYS.ACTIVE_PROJECT_KEY,
          window.app.__DEVELOPMENT__.initialProjectKey
        );
        return false;
      }
      // Rebuild the requested OIDC scope to verify that it didn't change.
      const requestedScope = buildOidcScope({ projectKey: activeProjectKey });
      // Check that the session scope didn't change.
      if (cachedScope === requestedScope) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  return window.localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
};

export default hasCachedAuthenticationState;
