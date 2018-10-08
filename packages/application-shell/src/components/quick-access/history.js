const STORAGE_KEY = 'quickAccessHistory';

export const saveHistory = value => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const loadHistory = () => {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    return [];
  }
};
