import { mapLocaleToIntlLocale } from '@commercetools-frontend/i18n';

type TCanPaintShellOptions = {
  isLoadingLocaleData: boolean;
  isLoadingUser: boolean;
  /** The locale `AsyncLocaleData` currently has a consistent catalogue for. */
  loadedLocale?: string;
  /** `user.language`, once `FetchLoggedInUser` has resolved. */
  userLanguage?: string | null;
  hasPaintedShell: boolean;
};

/**
 * Whether the shell may hand a locale to `ConfigureIntlProvider` yet.
 *
 * Two long-standing conditions: the catalogue has to be loaded, and the user
 * has to be known — an early locale fires `hideAppLoader` and swaps the
 * skeleton for a spinner.
 *
 * The third is the locale hint's cost. The hint lets the catalogue load start
 * before `FetchLoggedInUser` resolves, but a wrong guess would otherwise paint
 * the shell in a language the user never chose. So the *first* paint also waits
 * for the loaded catalogue to be the user's own. On a hit that is free, because
 * the guessed catalogue is already theirs. On a miss it costs one catalogue
 * load on the skeleton, which is what the shell did before the hint existed.
 *
 * Only the first paint: a later language change keeps the previous catalogue on
 * screen rather than blanking the shell while the new one loads.
 */
const canPaintShell = ({
  isLoadingLocaleData,
  isLoadingUser,
  loadedLocale,
  userLanguage,
  hasPaintedShell,
}: TCanPaintShellOptions) => {
  if (isLoadingLocaleData || isLoadingUser) return false;
  if (hasPaintedShell) return true;
  // No language on the user (or a failed load) must still paint, or the shell
  // would hang on the skeleton forever.
  if (!userLanguage) return true;
  // Compared as catalogue buckets, not as raw tags, and for the same reason
  // the hit/miss marks are: `user.language` is typed as a free string, so a
  // regional tag like `de-AT` resolves to the `de` catalogue the hint already
  // loaded. An exact match would hold the paint for a second load of the very
  // catalogue on screen, and record a hit for a user who got no speedup.
  return (
    mapLocaleToIntlLocale(loadedLocale ?? '') ===
    mapLocaleToIntlLocale(userLanguage)
  );
};

export default canPaintShell;
