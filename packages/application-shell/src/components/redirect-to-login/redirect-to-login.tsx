import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import {
  joinPaths,
  trimLeadingAndTrailingSlashes,
} from '@commercetools-frontend/url-utils';
import { OIDC_RESPONSE_TYPES } from '../../constants';
import useIsServedByProxy from '../../hooks/use-is-served-by-proxy';
import getMcOrigin from '../../utils/get-mc-origin';
import { buildOidcScope } from '../../utils/oidc';
import * as oidcStorage from '../../utils/oidc-storage';
import type { AuthorizeSessionState } from '../authenticated/types';
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
  oidcStorage.setSessionState(nonce, state);
  return nonce;
};

const RedirectToLogin = () => {
  const location = useLocation();
  const servedByProxy = useIsServedByProxy();

  if (window.app.__DEVELOPMENT__?.oidc?.authorizeUrl) {
    // We pick the project key from local storage. This assumes that the value
    // as been previously set when the application starts up.
    // This is necessary to allow switching projects and triggering a new login.
    const nextProjectKey = oidcStorage.getActiveProjectKey();

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
      applicationId: window.app.applicationId,
      // Store query parameters to be used after the callback redirect
      query: {
        redirectTo: nextProjectKey ? `/${nextProjectKey}` : '/',
      },
    });
    const requestedScope = buildOidcScope({
      projectKey: nextProjectKey ?? undefined,
      oAuthScopes: window.app.__DEVELOPMENT__?.oidc?.oAuthScopes,
      additionalOAuthScopes:
        window.app.__DEVELOPMENT__?.oidc?.additionalOAuthScopes,
      teamId: window.app.__DEVELOPMENT__?.oidc?.teamId,
      applicationId: window.app.__DEVELOPMENT__?.oidc?.applicationId,
    });

    // Store session scopes, to be able to detect if requested scopes changed
    // in the application config and invalidate the session.
    // This is only valid for local development.
    oidcStorage.setSessionScope(requestedScope);

    return (
      <Redirector
        to=""
        origin={window.app.__DEVELOPMENT__?.oidc?.authorizeUrl}
        location={location}
        queryParams={{
          reason: LOGOUT_REASONS.UNAUTHORIZED,
          // Query parameters for OIDC-lik workflow.
          client_id: window.app.applicationId,
          response_type: OIDC_RESPONSE_TYPES.ID_TOKEN,
          scope: requestedScope,
          state: sessionId,
          nonce: sessionId,
        }}
      />
    );
  }

  const mcOrigin = servedByProxy ? getMcOrigin(window.app.mcApiUrl) : undefined;

  return (
    <Redirector
      to="login"
      origin={mcOrigin}
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
