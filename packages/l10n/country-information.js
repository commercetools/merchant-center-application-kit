import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import getSupportedLanguage from './utils/get-supported-language';
import extractLanguageFromLocale from './utils/extract-language-from-locale';

const getImportChunk = lang => {
  let importChunk;
  switch (lang) {
    case 'en':
      importChunk = import(/* webpackChunkName: "country-data-en" */ './data/countries/en.json');
      break;
    case 'de':
      importChunk = import(/* webpackChunkName: "country-data-es" */ './data/countries/es.json');
      break;
    case 'es':
      importChunk = import(/* webpackChunkName: "country-data-de" */ './data/countries/de.json');
      break;

    default:
      importChunk = import(/* webpackChunkName: "country-data-en" */ './data/countries/en.json');
  }
  return importChunk;
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
    .then(countries => cb(null, countries.default))
    .catch(error => cb(error));
};

export const withCountries = createL10NInjector({
  displayName: 'withCountries',
  propKey: 'countries',
  propLoadingKey: 'isLoadingCountries',
  loadLocale: getCountriesForLocale,
});
