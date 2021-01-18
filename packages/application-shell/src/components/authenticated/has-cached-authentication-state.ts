import type { ApplicationWindow } from '@commercetools-frontend/constants';

import { STORAGE_KEYS } from '../../constants';
import * as oidcStorage from '../../utils/oidc-storage';
import { buildOidcScope } from './helpers';

declare let window: ApplicationWindow;

const hasCachedAuthenticationState = (): boolean => {
  if (window.app.__DEVELOPMENT__) {
    try {
      const cachedScope = oidcStorage.getSessionScope();
      // Force the user to log in again
      if (!cachedScope) {
        return false;
      }
      const activeProjectKey = oidcStorage.getActiveProjectKey();
      if (activeProjectKey) {
        // The application is not requesting a project key, therefore
        // we assume that the application does not need a project context
        // and we can remove the cached project key.
        // This is usually the case for applications like account.
        if (!window.app.__DEVELOPMENT__.initialProjectKey) {
          oidcStorage.removeActiveProjectKey();
        }
      } else {
        if (window.app.__DEVELOPMENT__.initialProjectKey) {
          // Here we store the initial project key in local storage,
          // so that it gets picked up when we initiate the login flow.
          oidcStorage.setActiveProjectKey(
            window.app.__DEVELOPMENT__.initialProjectKey
          );
        }
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
