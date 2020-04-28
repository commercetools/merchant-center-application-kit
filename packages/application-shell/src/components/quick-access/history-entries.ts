import type { HistoryEntry } from './types';

const STORAGE_KEY = 'quickAccessHistoryEntries';

export const saveHistoryEntries = (historyEntries: HistoryEntry[]) => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(historyEntries));
    return true;
  } catch (error) {
    return false;
  }
};

export const loadHistoryEntries = (): HistoryEntry[] => {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    return [];
  }
};
