import { STORAGE_KEYS } from '@commercetools-frontend/constants';

/**
 * Remembers the last `user.language` this browser saw, so the locale guess
 * made before `FetchLoggedInUser` resolves can be right for a returning user
 * instead of falling back to the browser's own language.
 *
 * One string, not a catalogue cache. Every access is guarded: `localStorage`
 * throws outright in some privacy modes rather than returning null, and a
 * wrong guess is only a slower first paint, never a failure — so a blocked
 * store degrades to the browser language rather than breaking the shell.
 */
export const readLastUserLanguage = (): string | undefined => {
  try {
    return (
      window.localStorage.getItem(STORAGE_KEYS.LAST_USER_LANGUAGE) ?? undefined
    );
  } catch {
    return undefined;
  }
};

export const writeLastUserLanguage = (language: string) => {
  try {
    window.localStorage.setItem(STORAGE_KEYS.LAST_USER_LANGUAGE, language);
  } catch {
    // Nothing to do: the next load just guesses from the browser instead.
  }
};
