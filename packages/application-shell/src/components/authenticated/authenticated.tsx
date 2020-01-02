import React from 'react';
import hasCachedAuthenticationState from './has-cached-authentication-state';
import AmILoggedIn from './am-i-logged-in';

type RenderFnArgs = { isAuthenticated: boolean };
type Props = {
  render: (args: RenderFnArgs) => JSX.Element;
  children?: never;
};

const Authenticated = (props: Props) => {
  // We attempt to see if the user was already authenticated by looking
  // at the "cached" flag in local storage.
  const cachedAuthenticationState = hasCachedAuthenticationState();
  if (cachedAuthenticationState) {
    return <>{props.render({ isAuthenticated: true })}</>;
  }

  return <AmILoggedIn {...props} />;
};
Authenticated.displayName = 'Authenticated';

export default Authenticated;
