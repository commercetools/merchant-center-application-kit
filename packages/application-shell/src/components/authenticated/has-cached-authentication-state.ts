import type { ApplicationWindow } from '@commercetools-frontend/constants';

import { STORAGE_KEYS, OIDC_CLAIMS } from '../../constants';
import { buildOidcScope } from '../../utils/oidc';
import * as oidcStorage from '../../utils/oidc-storage';

declare let window: ApplicationWindow;

const withoutProjectKeyClaim = (scope: string) =>
  scope
    .split(' ')
    .filter((claim) => !claim.startsWith(OIDC_CLAIMS.PROJECT_KEY))
    .join(' ');

const hasCachedAuthenticationState = (): boolean => {
  if (window.app.__DEVELOPMENT__?.oidc?.authorizeUrl) {
    try {
      const activeProjectKey = oidcStorage.getActiveProjectKey();
      if (activeProjectKey) {
        // GIVEN The application is not requesting a project key,
        // THEN we assume that the application does not need a project context.
        // GIVEN The application is not requesting a project key,
        // THEN we remove the cached project key.
        // This is the case of an application like `account`.
        if (!window.app.__DEVELOPMENT__?.oidc?.initialProjectKey) {
          oidcStorage.removeActiveProjectKey();
        }
      } else {
        if (window.app.__DEVELOPMENT__?.oidc?.initialProjectKey) {
          // Here we store the initial project key in local storage,
          // so that it gets picked up when we initiate the login flow.
          oidcStorage.setActiveProjectKey(
            window.app.__DEVELOPMENT__?.oidc?.initialProjectKey
          );
        }
      }

      // cachedScope is assumed to be the exact cached version of the `requestedScope`
      // if they don't match, then we know that one of the claims within the scope has changed
      // given a change, we need to force the user to log in, so that new values on respective claim
      // will apply for the given custom application
      const cachedScope = oidcStorage.getSessionScope();
      // Force the user to log in again
      if (!cachedScope) {
        return false;
      }
      // Rebuild the requested OIDC scope to verify that it didn't change.
      const requestedScope = buildOidcScope({
        projectKey: activeProjectKey ?? undefined,
        oAuthScopes: window.app.__DEVELOPMENT__?.oidc?.oAuthScopes,
        additionalOAuthScopes:
          window.app.__DEVELOPMENT__?.oidc?.additionalOAuthScopes,
        teamId: window.app.__DEVELOPMENT__?.oidc?.teamId,
        applicationId: window.app.__DEVELOPMENT__?.oidc?.applicationId,
      });
      // Omit the project key from the check. This allows to switch projects
      // without having to log in again.
      const cachedScopeWithoutProjectKey = withoutProjectKeyClaim(cachedScope);
      const requestedScopeWithoutProjectKey =
        withoutProjectKeyClaim(requestedScope);
      // Check that the session scope didn't change.
      if (cachedScopeWithoutProjectKey === requestedScopeWithoutProjectKey) {
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
