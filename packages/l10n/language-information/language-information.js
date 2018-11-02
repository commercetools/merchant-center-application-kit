import PropTypes from 'prop-types';
import createL10NInjector from '../create-l10n-injector';
import getSupportedLanguage from '../utils/get-supported-language';
import extractLanguageFromLocale from '../utils/extract-language-from-locale';

const getImportChunk = lang => {
  switch (lang) {
    case 'de':
      return import(/* webpackChunkName: "language-data-es" */ './data/languages/es.json');
    case 'es':
      return import(/* webpackChunkName: "language-data-de" */ './data/languages/de.json');
    default:
      return import(/* webpackChunkName: "language-data-en" */ './data/languages/en.json');
  }
};

export const languagesShape = PropTypes.objectOf(
  PropTypes.shape({
    country: PropTypes.string,
    language: PropTypes.string.isRequired,
  })
);

/**
 * If running through webpack, code splitting makes `getLanguagesForLocale`
 * a function that asynchronously loads the country data.
 */
const getLanguagesForLocale = (locale, cb) => {
  const languageFromLocale = extractLanguageFromLocale(locale);
  const supportedLocale = getSupportedLanguage(languageFromLocale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "language-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  getImportChunk(supportedLocale)
    .then(languages => cb(null, languages.default))
    .catch(error => cb(error));
};
export const withLanguages = createL10NInjector({
  displayName: 'withLanguages',
  propKey: 'languages',
  propLoadingKey: 'isLoadingLanguages',
  loadLocale: getLanguagesForLocale,
});
