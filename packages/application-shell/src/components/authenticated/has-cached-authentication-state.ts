import { STORAGE_KEYS } from '../../constants';

const hasCachedAuthenticationState = () => {
  const cachedSessionToken = window.sessionStorage.getItem(
    STORAGE_KEYS.SESSION_TOKEN
  );
  // @ts-expect-error
  if (cachedSessionToken && window.app.__DEVELOPMENT__) {
    try {
      const cachedScope = window.sessionStorage.getItem(
        STORAGE_KEYS.SESSION_SCOPE
      );
      // Force the user to log in again
      if (!cachedScope) {
        return false;
      }
      // Check that the session scope didn't change.
      // @ts-expect-error
      if (cachedScope === window.app.__DEVELOPMENT__.scope) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  return window.localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
};

export default hasCachedAuthenticationState;
