import { STORAGE_KEYS } from '../../constants';

// Attempt to load the `projectKey` from localStorage
export default function selectProjectKeyFromLocalStorage() {
  return window.localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_KEY);
}
