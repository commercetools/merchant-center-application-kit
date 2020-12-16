import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { AuthorizeSessionState } from '../authenticated/types';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import {
  joinPaths,
  trimLeadingAndTrailingSlashes,
} from '@commercetools-frontend/url-utils';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { STORAGE_KEYS } from '../../constants';
import Redirector from '../redirector';

declare let window: ApplicationWindow;

const generateAndCacheNonceWithState = (state: AuthorizeSessionState) => {
  const nonce = uuidv4();
  // We store additional information within the given `nonce`
  // to then retrieve it later when the IdP redirects back
  // to our application. The URL will contain the `nonce` within
  // the id_token and, once validated, we can retrieve and use
  // the state object.
  // https://auth0.com/docs/protocols/oauth2/oauth-state#how-to-use-the-parameter-to-restore-application-state
  window.sessionStorage.setItem(
    `${STORAGE_KEYS.NONCE}_${nonce}`,
    JSON.stringify(state)
  );
  return nonce;
};

const RedirectToLogin = () => {
  const location = useLocation();

  if (window.app.__DEVELOPMENT__) {
    // According to the OIDC spec, the `state` parameter is recommended to be sent
    // to the authorization server to help mitigating Cross-Site Request Forgery.
    // https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
    // Using `state` or `nonce` is very similar but with subtle differences.
    // Here we follow the approach described by Auth0 on how to use both, where
    // we generate a `nonce`, store it in session storage together with some state,
    // and send it to the authorization server as the `state` parameter.
    // https://auth0.com/docs/protocols/oauth2/redirect-users
    // Additionally, we still send the `nonce` parameter as well.
    const sessionId = generateAndCacheNonceWithState({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      applicationId: window.app.applicationId!,
      // Store query parameters to be used after the callback redirect
      query: {
        redirectTo: `/${window.app.__DEVELOPMENT__.projectKey}`,
      },
    });
    // Store session scopes, to be able to detect if requested scopes changed
    // in the application config and invalidate the session.
    // This is only valid for local development.
    window.sessionStorage.setItem(
      STORAGE_KEYS.SESSION_SCOPE,
      window.app.__DEVELOPMENT__.scope
    );

    return (
      <Redirector
        to="login"
        origin={window.app.__DEVELOPMENT__.authorizeUrl}
        location={location}
        queryParams={{
          reason: LOGOUT_REASONS.UNAUTHORIZED,
          // Query parameters for OIDC-lik workflow.
          client_id: window.app.applicationId,
          response_type: 'id_token',
          scope: window.app.__DEVELOPMENT__.scope,
          state: sessionId,
          nonce: sessionId,
        }}
      />
    );
  }
  return (
    <Redirector
      to="login"
      location={location}
      queryParams={{
        reason: LOGOUT_REASONS.UNAUTHORIZED,
        redirectTo: trimLeadingAndTrailingSlashes(
          joinPaths(window.location.origin, location.pathname)
        ),
      }}
    />
  );
};
RedirectToLogin.displayName = 'RedirectToLogin';

export default RedirectToLogin;
