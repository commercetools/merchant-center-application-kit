import { STORAGE_KEYS } from '../../constants';

// Attempt to load the `teamId` from localStorage
export default function selectTeamIdFromLocalStorage() {
  return window.localStorage.getItem(STORAGE_KEYS.ACTIVE_TEAM_ID);
}
