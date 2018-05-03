const supportedLocales = ['en', 'de'];

// This function is reponsible of passing the fallback language "en"
// in case the given language is not supported by the application yet
export default function getSupportedLocale(locale) {
  return supportedLocales.includes(locale) ? locale : 'en';
}
