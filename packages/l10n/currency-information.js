import createL10NInjector from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

const getImportChunk = locale => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "currency-data-de" */ './data/currencies/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "currency-data-es" */ './data/currencies/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "currency-data-fr-FR" */ './data/currencies/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "currency-data-zh-CN" */ './data/currencies/zh-CN.json'
      );
    default:
      return import(
        /* webpackChunkName: "currency-data-en" */ './data/currencies/en.json'
      );
  }
};

/**
 * If running through webpack, code splitting makes `getCurrenciesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCurrenciesForLocale = (locale, cb) => {
  const supportedLocale = getSupportedLocale(locale);
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
