import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { decode } from 'qss';
import { useLocation } from 'react-router-dom';
import { oidcStorage } from '@commercetools-frontend/application-shell-connectors';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import { useRedirector } from '../redirector';
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
  const redirector = useRedirector();
  const [message, setMessage] = useState<string>();
  const fragments = decode<AuthorizeCallbackFragments>(
    location.hash.substring(1)
  );
  const sessionToken = fragments.sessionToken;

  useEffect(() => {
    // Validate the nonce (coming as a `state` parameter)
    // By trying to load the related session state, we can implicitly check if the nonce is correct or not.
    const sessionState = oidcStorage.getSessionState<AuthorizeSessionState>(
      fragments.state
    );

    let errorMessage: string | undefined;
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
      setMessage(errorMessage);
    } else {
      oidcStorage.setActiveSession(sessionToken);
      oidcStorage.removeSessionState(fragments.state);

      if (sessionState?.query.redirectTo) {
        try {
          const redirectToUrl = new URL(sessionState.query.redirectTo);
          redirector({ to: redirectToUrl.pathname });
          return;
        } catch (error) {
          console.warn(
            `Invalid "redirectTo" URL`,
            sessionState.query.redirectTo
          );
          // ignore
        }
      }
      redirector({
        to: location.pathname.replace('/oidc/callback', ''),
      });
      return;
    }

    // Only execute once!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (message) {
    return (
      <OidcCallbackErrorPage
        message={message}
        locale={props.locale}
        applicationMessages={props.applicationMessages}
      />
    );
  }

  return null;
};
OidcCallback.displayName = 'OidcCallback';

export default OidcCallback;
