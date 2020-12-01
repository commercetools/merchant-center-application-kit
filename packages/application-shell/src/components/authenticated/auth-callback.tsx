import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { AuthorizeSessionState } from './types';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { decode } from 'qss';
import jwtDecode from 'jwt-decode';
import Card from '@commercetools-uikit/card';
import Constraints from '@commercetools-uikit/constraints';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { STORAGE_KEYS, LOGIN_STRATEGY_OIDC } from '../../constants';
import Redirector from '../redirector';

declare let window: ApplicationWindow;

type AuthorizeCallbackFragments = { sessionToken?: string; state: string };
type SessionToken = { nonce: string };

const removeSSOSessionState = (key: string) =>
  window.sessionStorage.removeItem(key);
const getSSOSessionState = (key: string): AuthorizeSessionState | null => {
  const unparsedSessionState = window.sessionStorage.getItem(key);
  if (unparsedSessionState) {
    try {
      const parsedSessionState = JSON.parse(
        unparsedSessionState
      ) as AuthorizeSessionState;

      removeSSOSessionState(key);

      return parsedSessionState;
    } catch (error) {
      removeSSOSessionState(key);

      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(
          `Cannot parse session state for "${key}".\n${unparsedSessionState}`
        );
      }
    }
  }
  return null;
};

const AuthCallback = () => {
  const location = useLocation();
  let errorMessage: string | undefined;

  const fragments = decode<AuthorizeCallbackFragments>(
    location.hash.substring(1)
  );

  // Validate the nonce (coming as a `state` parameter)
  // By trying to load the related session state, we can implicitly check if the nonce is correct or not.
  const sessionState = getSSOSessionState(
    [STORAGE_KEYS.NONCE, fragments.state].join('_')
  );

  const sessionToken = fragments.sessionToken;
  let decodedSessionToken: SessionToken | undefined;
  try {
    if (sessionToken) {
      decodedSessionToken = jwtDecode<SessionToken>(sessionToken);
    } else {
      errorMessage = 'Invalid client session';
    }
  } catch (err) {
    errorMessage = err.message;
  }

  if (!errorMessage) {
    const hasValidSessionId = decodedSessionToken?.nonce === fragments.state;
    const hasValidApplicationId =
      window.app.applicationId === sessionState?.applicationId;
    if (!sessionState || !hasValidSessionId || !hasValidApplicationId) {
      errorMessage = 'Invalid client session';
    }
  }
  console.log('errorMessage', errorMessage, decodedSessionToken, sessionState)
  if (errorMessage) {
    return (
      <Card>
        <Constraints.Horizontal constraint="l">
          <Spacings.Stack scale="l">
            <Text.Headline as="h2">{'Authentication error'}</Text.Headline>
            <ContentNotification type="error">
              <Spacings.Stack scale="m">
                <Text.Body>{errorMessage}</Text.Body>
              </Spacings.Stack>
            </ContentNotification>
          </Spacings.Stack>
        </Constraints.Horizontal>
      </Card>
    );
  }

  window.localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
  window.localStorage.setItem(STORAGE_KEYS.LOGIN_STRATEGY, LOGIN_STRATEGY_OIDC);
  // Store the sessionToken
  window.sessionStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, sessionToken ?? '');
console.log('sessionState', sessionState)
  if (sessionState?.query.redirectTo) {
    try {
      const redirectToUrl = new URL(sessionState.query.redirectTo);
      console.log('callback, redirecting to', redirectToUrl)
      return <Redirector to={redirectToUrl.pathname} />;
    } catch (error) {
      console.warn(`Invalid "redirectTo" URL`, sessionState.query.redirectTo);
      // ignore
    }
  }
  return <Redirector to="/" />;
};
AuthCallback.displayName = 'AuthCallback';

export default AuthCallback;
