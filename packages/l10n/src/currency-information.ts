import * as PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';
import { Currencies } from './types';

type ImportData = {
  default: Currencies;
};

const getImportChunk = (locale: string): Promise<ImportData> => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "currency-data-de" */ '../data/currencies/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "currency-data-es" */ '../data/currencies/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "currency-data-fr-FR" */ '../data/currencies/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "currency-data-zh-CN" */ '../data/currencies/zh-CN.json'
      );
    default:
      return import(
        /* webpackChunkName: "currency-data-en" */ '../data/currencies/en.json'
      );
  }
};

export const currenciesShape = PropTypes.objectOf(
  PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string })
);

/**
 * If running through webpack, code splitting makes `getCurrenciesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCurrenciesForLocale = (
  locale: string,
  cb: (error?: Error, currencies?: Currencies) => void
) => {
  const supportedLocale = getSupportedLocale(locale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "currency-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  getImportChunk(supportedLocale)
    // Prefer loading `default` (for ESM bundles) and
    // fall back to normal import (for CJS bundles).
    .then(currencies => cb(undefined, currencies.default || currencies))
    .catch(error => cb(error));
};

// eslint-disable-next-line import/prefer-default-export
export const withCurrencies = createL10NInjector<Currencies>({
  displayName: 'withCurrencies',
  propKey: 'currencies',
  propLoadingKey: 'isLoadingCurrencies',
  loadLocale: getCurrenciesForLocale,
});
