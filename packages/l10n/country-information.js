import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import getSupportedLanguage from './utils/get-supported-language';
import extractLanguageFromLocale from './utils/extract-language-from-locale';

const getImportChunk = lang => {
  switch (lang) {
    case 'de':
      return import(/* webpackChunkName: "country-data-de" */ './data/countries/de.json');
    case 'es':
      return import(/* webpackChunkName: "country-data-es" */ './data/countries/es.json');
    default:
      return import(/* webpackChunkName: "country-data-en" */ './data/countries/en.json');
  }
};

export const countriesShape = PropTypes.objectOf(PropTypes.string);

/**
 * If running through webpack, code splitting makes `getCountriesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCountriesForLocale = (locale, cb) => {
  const languageFromLocale = extractLanguageFromLocale(locale);
  const supportedLocale = getSupportedLanguage(languageFromLocale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "country-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  getImportChunk(supportedLocale)
    // Prefer loading `default` (for ESM bundles) and
    // fall back to normal import (for CJS bundles).
    .then(countries => cb(null, countries.default || countries))
    .catch(error => cb(error));
};

export const withCountries = createL10NInjector({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});
