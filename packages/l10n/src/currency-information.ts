import PropTypes from 'prop-types';
import type { Currencies } from './types';
import { createL10NInjector, createL10NHook } from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

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
    case 'ja':
      return import(
        /* webpackChunkName: "currency-data-ja" */ '../data/currencies/ja.json'
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
const getCurrenciesForLocale = async (locale: string) => {
  const supportedLocale = getSupportedLocale(locale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "currency-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  const currencies = await getImportChunk(supportedLocale);
  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  return currencies.default || currencies;
};

export const withCurrencies = createL10NInjector<Currencies>({
  displayName: 'withCurrencies',
  propKey: 'currencies',
  propLoadingKey: 'isLoadingCurrencies',
  loadLocale: getCurrenciesForLocale,
});

export const useCurrencies = createL10NHook(getCurrenciesForLocale);
