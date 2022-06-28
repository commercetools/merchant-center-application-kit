import PropTypes from 'prop-types';
import type { Countries } from './types';
import { createL10NInjector, createL10NHook } from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

type ImportData = {
  default: Countries;
};

const getImportChunk = (locale: string): Promise<ImportData> => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "country-data-de" */ '../data/countries/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "country-data-es" */ '../data/countries/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "country-data-fr-FR" */ '../data/countries/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "country-data-zh-CN" */ '../data/countries/zh-CN.json'
      );
    case 'ja':
      return import(
        /* webpackChunkName: "country-data-ja" */ '../data/countries/ja.json'
      );
    default:
      return import(
        /* webpackChunkName: "country-data-en" */ '../data/countries/en.json'
      );
  }
};

export const countriesShape = PropTypes.objectOf(PropTypes.string);

/**
 * If running through webpack, code splitting makes `getCountriesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCountriesForLocale = async (locale: string) => {
  const supportedLocale = getSupportedLocale(locale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "country-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  const countries = await getImportChunk(supportedLocale);
  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  return countries.default || countries;
};

export const withCountries = createL10NInjector<Countries>({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});

export const useCountries = createL10NHook(getCountriesForLocale);
