import { sessionStorage } from '@commercetools-frontend/storage';

const STORAGE_KEY = 'quickAccessHistory';

export const saveHistory = value => {
  try {
    sessionStorage.put(STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const loadHistory = () => {
  try {
    const value = sessionStorage.get(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    return [];
  }
};
