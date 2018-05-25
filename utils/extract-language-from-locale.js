// Given a locale (language + countryCode), we extract the language part.
// For example: `en-GB` => `en`.
export default function extractLanguageFromLocale(locale) {
  return locale.includes('-') ? locale.split('-')[0] : locale;
}
