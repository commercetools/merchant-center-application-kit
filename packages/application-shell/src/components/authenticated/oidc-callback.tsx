import jwtDecode from 'jwt-decode';
import { decode } from 'qss';
import { useLocation } from 'react-router-dom';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import * as oidcStorage from '../../utils/oidc-storage';
import Redirector from '../redirector';
import OidcCallbackErrorPage from './oidc-callback-error-page';
import type { AuthorizeSessionState } from './types';

declare let window: ApplicationWindow;

export type TOidcCallbackProps = {
  locale: string;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  children?: never;
};
type AuthorizeCallbackFragments = { sessionToken?: string; state: string };
type SessionToken = { nonce: string };

const OidcCallback = (props: TOidcCallbackProps) => {
  const location = useLocation();
  let errorMessage: string | undefined;

  const fragments = decode<AuthorizeCallbackFragments>(
    location.hash.substring(1)
  );

  // Validate the nonce (coming as a `state` parameter)
  // By trying to load the related session state, we can implicitly check if the nonce is correct or not.
  const sessionState = oidcStorage.getSessionState<AuthorizeSessionState>(
    fragments.state
  );

  const sessionToken = fragments.sessionToken;
  let decodedSessionToken: SessionToken | undefined;
  try {
    if (sessionToken) {
      decodedSessionToken = jwtDecode<SessionToken>(sessionToken);
    } else {
      errorMessage = 'Invalid client session (missing sessionToken)';
    }
  } catch (err) {
    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = 'Unknown error';
    }
  }

  if (!errorMessage) {
    const hasValidSessionId = decodedSessionToken?.nonce === fragments.state;
    const hasValidApplicationId =
      window.app.applicationId === sessionState?.applicationId;
    if (!sessionState || !hasValidSessionId || !hasValidApplicationId) {
      errorMessage = 'Invalid client session';
    }
  }

  if (errorMessage) {
    return (
      <OidcCallbackErrorPage
        message={errorMessage}
        locale={props.locale}
        applicationMessages={props.applicationMessages}
      />
    );
  }

  oidcStorage.setActiveSession(sessionToken);

  if (sessionState?.query.redirectTo) {
    try {
      const redirectToUrl = new URL(sessionState.query.redirectTo);
      return <Redirector to={redirectToUrl.pathname} />;
    } catch (error) {
      console.warn(`Invalid "redirectTo" URL`, sessionState.query.redirectTo);
      // ignore
    }
  }
  return <Redirector to={location.pathname.replace('/oidc/callback', '')} />;
};
OidcCallback.displayName = 'OidcCallback';

export default OidcCallback;
