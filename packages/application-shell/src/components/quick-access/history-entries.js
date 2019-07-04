const STORAGE_KEY = 'quickAccessHistoryEntries';

export const saveHistoryEntries = value => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const loadHistoryEntries = () => {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    return [];
  }
};
