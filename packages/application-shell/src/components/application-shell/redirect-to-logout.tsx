import type { RouteProps } from 'react-router-dom';

import React from 'react';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Redirector from '../redirector';

// When the application redirects to this route, we always force a hard redirect
// to the logout route of the authentication service.
const RedirectToLogout = (props: RouteProps) => {
  const servedByProxy = useApplicationContext(
    (context) => context.environment.servedByProxy
  );
  return (
    <Redirector
      to="logout"
      location={props.location}
      queryParams={{
        reason: LOGOUT_REASONS.USER,
        ...(servedByProxy
          ? {}
          : {
              // This will be used after being logged in, to redirect to this location.
              redirectTo: window.location.origin,
            }),
      }}
    />
  );
};

export default RedirectToLogout;
