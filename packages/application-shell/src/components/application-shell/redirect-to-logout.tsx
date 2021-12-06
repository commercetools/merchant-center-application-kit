import type { ApplicationWindow } from '@commercetools-frontend/constants';

import { useLocation } from 'react-router-dom';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import useIsServedByProxy from '../../hooks/use-is-served-by-proxy';
import * as oidcStorage from '../../utils/oidc-storage';
import Redirector from '../redirector';
import RedirectToLogin from './redirect-to-login';
import { getMcOrigin } from './helpers';

declare let window: ApplicationWindow;

type Props = {
  reason?: typeof LOGOUT_REASONS[keyof typeof LOGOUT_REASONS];
};

// When the application redirects to this route, we always force a hard redirect
// to the logout route of the authentication service.
const RedirectToLogout = (props: Props) => {
  const location = useLocation();
  const servedByProxy = useIsServedByProxy();

  if (window.app.__DEVELOPMENT__?.oidc?.authorizeUrl) {
    // Remove the `sessionToken` from storage, so that the AppShell can initiate
    // a new authorization flow.
    oidcStorage.clearSession();

    return <RedirectToLogin />;
  }

  const mcOrigin = servedByProxy ? getMcOrigin(window.app.mcApiUrl) : undefined;

  return (
    <Redirector
      to="logout"
      origin={mcOrigin}
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
