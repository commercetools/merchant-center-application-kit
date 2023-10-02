import { STORAGE_KEYS, LOGIN_STRATEGY_OIDC } from '../constants';

const getSessionToken = (): string | null =>
  window.sessionStorage.getItem(STORAGE_KEYS.SESSION_TOKEN);

const setActiveSession = (sessionToken?: string): void => {
  if (!sessionToken) return;

  window.sessionStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, sessionToken ?? '');
  window.localStorage.setItem(STORAGE_KEYS.LOGIN_STRATEGY, LOGIN_STRATEGY_OIDC);
  // Remove flag for original workflow
  window.localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
};

const clearSession = (): void => {
  window.sessionStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
  window.sessionStorage.removeItem(STORAGE_KEYS.SESSION_SCOPE);
  window.sessionStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
};

const getActiveProjectKey = (): string | null =>
  window.localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_KEY);

const removeActiveProjectKey = (): void => {
  window.localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROJECT_KEY);
};

const setActiveProjectKey = (projectKey: string): void => {
  window.localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_KEY, projectKey);
};

const getSessionScope = (): string | null =>
  window.sessionStorage.getItem(STORAGE_KEYS.SESSION_SCOPE);

const setSessionScope = (scope: string): void => {
  window.sessionStorage.setItem(STORAGE_KEYS.SESSION_SCOPE, scope);
};

const getSessionState = <State extends {}>(stateId?: string): State | null => {
  const sessionStateKey = `${STORAGE_KEYS.NONCE}_${stateId}`;
  const unparsedSessionState = window.sessionStorage.getItem(sessionStateKey);
  if (unparsedSessionState) {
    try {
      const parsedSessionState = JSON.parse(unparsedSessionState) as State;

      window.sessionStorage.removeItem(sessionStateKey);

      return parsedSessionState;
    } catch (error) {
      window.sessionStorage.removeItem(sessionStateKey);

      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(
          `Cannot parse session state for "${sessionStateKey}".\n${unparsedSessionState}`
        );
      }
    }
  }
  return null;
};

const setSessionState = <State extends {}>(
  stateId: string,
  state: State
): void => {
  const sessionStateKey = `${STORAGE_KEYS.NONCE}_${stateId}`;
  window.sessionStorage.setItem(sessionStateKey, JSON.stringify(state));
};

export {
  getSessionToken,
  setActiveSession,
  clearSession,
  getSessionState,
  setSessionState,
  getActiveProjectKey,
  setActiveProjectKey,
  removeActiveProjectKey,
  getSessionScope,
  setSessionScope,
};
