import { useEffect } from 'react';
import { writeLastUserLanguage } from '../../utils';

/**
 * Persists the user's own language so the next load can guess it before
 * `FetchLoggedInUser` resolves.
 *
 * Takes `user.language`, never the staff-bar override: the override is a
 * temporary impersonation, and storing it would make the next load guess a
 * language the user never chose.
 */
const RememberUserLanguage = ({ language }: { language?: string | null }) => {
  useEffect(() => {
    if (language) writeLastUserLanguage(language);
  }, [language]);
  return null;
};

export default RememberUserLanguage;
