import {
  type ApplicationWindow,
  STORAGE_KEYS,
} from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

// Attempt to load the `teamId` from sessionStorage
export default function selectTeamIdFromStorage() {
  return (
    window.sessionStorage.getItem(STORAGE_KEYS.ACTIVE_TEAM_ID) ||
    window.app.__DEVELOPMENT__?.oidc?.teamId
  );
}
