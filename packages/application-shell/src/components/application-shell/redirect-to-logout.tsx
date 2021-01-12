import type { ApplicationWindow } from '@commercetools-frontend/constants';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { STORAGE_KEYS } from '../../constants';
import Redirector from '../redirector';
import RedirectToLogin from './redirect-to-login';

declare let window: ApplicationWindow;

type Props = {
  reason?: typeof LOGOUT_REASONS[keyof typeof LOGOUT_REASONS];
};

// When the application redirects to this route, we always force a hard redirect
// to the logout route of the authentication service.
const RedirectToLogout = (props: Props) => {
  const location = useLocation();
  const servedByProxy = useApplicationContext(
    (context) => context.environment.servedByProxy
  );

  if (window.app.__DEVELOPMENT__) {
    // Remove the `sessionToken` from storage, so that the AppShell can initiate
    // a new authorization flow.
    window.sessionStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
    window.sessionStorage.removeItem(STORAGE_KEYS.SESSION_SCOPE);
    window.sessionStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
    return <RedirectToLogin />;
  }

  return (
    <Redirector
      to="logout"
      location={location}
      queryParams={{
        reason: props.reason ?? LOGOUT_REASONS.USER,
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
