import { JSX } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS,
  type ApplicationWindow,
} from '@commercetools-frontend/constants';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import { SuspendedRoute } from '../suspended-route';
import AmILoggedIn from './am-i-logged-in';
import hasCachedAuthenticationState from './has-cached-authentication-state';
import OidcCallback from './oidc-callback.async';

declare let window: ApplicationWindow;

type RenderFnArgs = { isAuthenticated: boolean };
export type TAuthenticatedProps = {
  render: (args: RenderFnArgs) => JSX.Element;
  locale: string;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children?: never;
};

const Authenticated = (props: TAuthenticatedProps) => {
  // We attempt to see if the user was already authenticated by looking
  // at the "cached" flag in local storage.
  const cachedAuthenticationState = hasCachedAuthenticationState();

  if (cachedAuthenticationState) {
    return <>{props.render({ isAuthenticated: true })}</>;
  }

  // When using the OIDC workflow, we always return false, to trigger
  // the redirect to the login page.
  if (window.app.__DEVELOPMENT__?.oidc?.authorizeUrl) {
    return <>{props.render({ isAuthenticated: false })}</>;
  }

  // Fall back to check for cookie-based authentication.
  return <AmILoggedIn {...props} />;
};
Authenticated.displayName = 'Authenticated';

const AuthenticationRoutes = (props: TAuthenticatedProps) => {
  const oidcCallback = (
    <OidcCallback
      locale={props.locale}
      applicationMessages={props.applicationMessages}
    />
  );

  return (
    <Switch>
      <SuspendedRoute
        path={PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS.map(
          (entryPointUriPath) => `/${entryPointUriPath}/oidc/callback`
        )}
      >
        {oidcCallback}
      </SuspendedRoute>
      <SuspendedRoute path={`/:projectKey/:identifier/oidc/callback`}>
        {oidcCallback}
      </SuspendedRoute>
      <Route>
        <Authenticated {...props} />
      </Route>
    </Switch>
  );
};
AuthenticationRoutes.displayName = 'AuthenticationRoutes';

export default AuthenticationRoutes;
