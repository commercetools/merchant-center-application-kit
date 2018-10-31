import PropTypes from 'prop-types';
import createL10NInjector from '../create-l10n-injector';
import getSupportedLanguage from '../utils/get-supported-language';
import extractLanguageFromLocale from '../utils/extract-language-from-locale';

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
  import(/* webpackChunkName: "country-data-[request]" */
  `../data/countries/${supportedLocale}.json`)
    .then(countries => cb(null, countries.default))
    .catch(error => cb(error));
};

export const withCountries = createL10NInjector({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});
