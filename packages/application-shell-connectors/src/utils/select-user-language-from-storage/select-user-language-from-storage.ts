import {
  type ApplicationWindow,
  STORAGE_KEYS,
} from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

// Attempt to load the `user language` from sessionStorage
export default function selectUserLanguageFromStorage() {
  return (
    window.sessionStorage.getItem(STORAGE_KEYS.ACTIVE_USER_LANGUAGE) || null
  );
}
