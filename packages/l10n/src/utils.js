export const mapLocaleToIntlLocale = locale => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr-FR';
  if (locale === 'zh-CN') return 'zh-CN';
  return 'en';
};

const supportedLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN'];
const defaultLocale = 'en';

// Given a locale, return the locale only if it's whitelisted.
// If not, return a default locale.
export function getSupportedLocale(locale) {
  const isSupported = supportedLocales.find(supportedLocale =>
    locale.startsWith(supportedLocale)
  );
  return isSupported ? locale : defaultLocale;
}

// given a currenyCode and a list of currencies with the following shape
// [{ label, symbol }], we return the symbol.
export const getSymbolFromCurrency = (currencyCode, currencies) => {
  if (currencies[currencyCode] && currencies[currencyCode].symbol) {
    return currencies[currencyCode].symbol;
  }
  return '';
};

// From https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js
export const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};
