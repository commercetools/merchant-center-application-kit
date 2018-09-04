import * as storage from '@commercetools-frontend/storage';
import { STORAGE_KEYS } from '../../constants';

// Attempt to load the `projectKey` from localStorage. If none is found,
// return the given default `projectKey`.
// NOTE: this function should only be used whenever we don't know the
// `projectKey` from the URL (e.g. go to `/`).
export default function loadProjectKeyForRedirect(defaultProjectKey) {
  const cachedProjectKey = storage.get(STORAGE_KEYS.ACTIVE_PROJECT_KEY);
  return cachedProjectKey || defaultProjectKey;
}
