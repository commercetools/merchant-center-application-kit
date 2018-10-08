import * as storage from '@commercetools-frontend/storage';
import { STORAGE_KEYS } from '../../constants';

// Attempt to load the `projectKey` from localStorage
export default function selectProjectKeyFromLocalStorage() {
  return storage.get(STORAGE_KEYS.ACTIVE_PROJECT_KEY);
}
