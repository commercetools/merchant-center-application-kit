import { STORAGE_KEYS } from '../../constants';

// Attempt to load the `teamId` from sessionStorage
export default function selectTeamIdFromSessionStorage() {
  return (
    window.sessionStorage.getItem(STORAGE_KEYS.ACTIVE_TEAM_ID) || undefined
  );
}
