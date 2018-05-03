const supportedLocales = ['en', 'de'];

export default function getSupportedLocale(locale) {
  return supportedLocales.includes(locale) ? locale : 'en';
}
