import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import {
  getSupportedLocale,
  extractLanguageFromLocale,
} from './get-supported-locale';

export const countriesShape = PropTypes.objectOf(PropTypes.string);

/**
 * If running through webpack, code splitting makes `getCountriesForLocale`
 * a function that asynchronously loads the country data.
 */
const getCountriesForLocale = (locale, cb) => {
  const languageFromLocale = extractLanguageFromLocale(locale);
  const supportedLocale = getSupportedLocale(languageFromLocale);
  // Use lazy once so that subsequent calls to import() will use the same
  // network response. https://webpack.js.org/api/module-methods/#import-
  import(/* webpackChunkName: "country-data", webpackMode: "lazy-once" */
  `./data/countries/${supportedLocale}.json`)
    .then(countries => cb(null, countries.default))
    .catch(error => cb(error));
};

export const withCountries = createL10NInjector({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});
