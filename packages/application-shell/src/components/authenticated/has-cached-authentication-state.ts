import { STORAGE_KEYS } from '../../constants';

const hasCachedAuthenticationState = () =>
  window.localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';

export default hasCachedAuthenticationState;
