import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import hasCachedAuthenticationState from './has-cached-authentication-state';
import AmILoggedIn from './am-i-logged-in';
import AuthCallback from './auth-callback';

declare let window: ApplicationWindow;

type RenderFnArgs = { isAuthenticated: boolean };
export type TProps = {
  render: (args: RenderFnArgs) => JSX.Element;
  locale: string;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children?: never;
};

const Authenticated = (props: TProps) => {
  // We attempt to see if the user was already authenticated by looking
  // at the "cached" flag in local storage.
  const cachedAuthenticationState = hasCachedAuthenticationState();

  if (cachedAuthenticationState) {
    return <>{props.render({ isAuthenticated: true })}</>;
  }

  // When using the OIDC workflow, we always return false, to trigger
  // the redirect to the login page.
  if (window.app.__DEVELOPMENT__) {
    return <>{props.render({ isAuthenticated: false })}</>;
  }

  // Fall back to check for cookie-based authentication.
  return <AmILoggedIn {...props} />;
};
Authenticated.displayName = 'Authenticated';

const AuthenticationRoutes = (props: TProps) => (
  <Switch>
    <Route path={`/account/auth/callback`}>
      <AuthCallback
        locale={props.locale}
        applicationMessages={props.applicationMessages}
      />
    </Route>
    <Route path={`/:projectKey/${window.app.entryPointUriPath}/auth/callback`}>
      <AuthCallback
        locale={props.locale}
        applicationMessages={props.applicationMessages}
      />
    </Route>
    <Route>
      <Authenticated {...props} />
    </Route>
  </Switch>
);
AuthenticationRoutes.displayName = 'AuthenticationRoutes';

export default AuthenticationRoutes;
