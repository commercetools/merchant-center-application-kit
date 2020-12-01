import { STORAGE_KEYS } from '../../constants';

const hasCachedAuthenticationState = () =>
  window.sessionStorage.getItem(STORAGE_KEYS.SESSION_TOKEN) != null ||
  window.localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';

export default hasCachedAuthenticationState;
