import { STORAGE_KEYS } from '@commercetools-frontend/constants';

// Attempt to load the `projectKey` from localStorage
export default function selectProjectKeyFromLocalStorage() {
  return window.localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_KEY);
}
