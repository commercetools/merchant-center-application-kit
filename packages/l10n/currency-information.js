import createL10NInjector from './create-l10n-injector';
import getSupportedLanguage from './utils/get-supported-language';
import extractLanguageFromLocale from './utils/extract-language-from-locale';

const getImportChunk = lang => {
  switch (lang) {
    case 'de':
      return import(/* webpackChunkName: "currency-data-es" */ './data/currencies/es.json');
    case 'es':
      return import(/* webpackChunkName: "currency-data-de" */ './data/currencies/de.json');
    default:
      return import(/* webpackChunkName: "currency-data-en" */ './data/currencies/en.json');
  }
};

/**
 * If running through webpack, code splitting makes `getCurrenciesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCurrenciesForLocale = (locale, cb) => {
  const languageFromLocale = extractLanguageFromLocale(locale);
  const supportedLocale = getSupportedLanguage(languageFromLocale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "currency-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  getImportChunk(supportedLocale)
    // Prefer loading `default` (for ESM bundles) and
    // fall back to normal import (for CJS bundles).
    .then(currencies => cb(null, currencies.default || currencies))
    .catch(error => cb(error));
};

// eslint-disable-next-line import/prefer-default-export
export const withCurrencies = createL10NInjector({
  displayName: 'withCurrencies',
  propKey: 'currencies',
  propLoadingKey: 'isLoadingCurrencies',
  loadLocale: getCurrenciesForLocale,
});
