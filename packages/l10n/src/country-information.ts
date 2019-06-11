import * as PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

type Countries = {
  default: Record<string, string>;
};

const getImportChunk = (locale: string): Promise<Countries> => {
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
const getCountriesForLocale = (
  locale: string,
  cb: (error?: Error, countries?: Record<string, string>) => void
) => {
  const supportedLocale = getSupportedLocale(locale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "country-sdata-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  getImportChunk(supportedLocale)
    // Prefer loading `default` (for ESM bundles) and
    // fall back to normal import (for CJS bundles).
    .then(countries => cb(undefined, countries.default || countries))
    .catch(error => cb(error, undefined));
};

export const withCountries = createL10NInjector<Record<string, string>>({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});
