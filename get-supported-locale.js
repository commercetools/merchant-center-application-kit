const supportedLocales = ['en', 'de'];

// This function is reponsible of passing the fallback language "en"
// in case the given language is not supported by the application yet
export function getSupportedLocale(locale) {
  return supportedLocales.includes(locale) ? locale : 'en';
}

/* This function is needed in order to parse the locale + region that we allow in the user
*  settings. Because we only have messages for `en` and `de`, we need to always get just the
*  first part of the locale (`en-GB` would be `en`) so the app does not break.
*/
export function extractLanguageFromLocale(locale) {
  return locale.includes('-') ? locale.split('-')[0] : locale;
}
