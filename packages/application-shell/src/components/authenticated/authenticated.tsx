import type { ApplicationWindow } from '@commercetools-frontend/constants';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import hasCachedAuthenticationState from './has-cached-authentication-state';
import AmILoggedIn from './am-i-logged-in';
import AuthCallback from './auth-callback';

declare let window: ApplicationWindow;

type RenderFnArgs = { isAuthenticated: boolean };
export type TProps = {
  render: (args: RenderFnArgs) => JSX.Element;
  children?: never;
};

const Authenticated = (props: TProps) => {
  // We attempt to see if the user was already authenticated by looking
  // at the "cached" flag in local storage.
  const cachedAuthenticationState = hasCachedAuthenticationState();
  console.log('cached is auth', cachedAuthenticationState);

  if (cachedAuthenticationState) {
    return <>{props.render({ isAuthenticated: true })}</>;
  }

  return <AmILoggedIn {...props} />;
};
Authenticated.displayName = 'Authenticated';

const AuthenticationRoutes = (props: TProps) => (
  <Switch>
    <Route path={`/:projectKey/${window.app.entryPointUriPath}/auth/callback`}>
      <AuthCallback />
    </Route>
    <Route>
      <Authenticated {...props} />
    </Route>
  </Switch>
);
AuthenticationRoutes.displayName = 'AuthenticationRoutes';

export default AuthenticationRoutes;
