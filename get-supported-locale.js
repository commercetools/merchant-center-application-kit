const supportedLanguages = ['en', 'de'];

// This function is reponsible of passing the fallback language "en"
// in case the given language is not supported by the application yet
export function getSupportedLanguage(language) {
  return supportedLanguages.includes(language) ? language : 'en';
}

/* This function is needed in order to parse the locale (<language-code>-<country-code>) that we allow in the user
*  we allow in the user settings. Because we only have messages for `en` and `de`, we need to always get just the
*  first part of the locale, the language, (`en-GB` would be `en`) so the app does not break.
*/
export function extractLanguageFromLocale(locale) {
  return locale.includes('-') ? locale.split('-')[0] : locale;
}
