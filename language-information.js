import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import getSupportedLocale from './get-supported-locale';

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
  const supportedLocale = getSupportedLocale(locale);
  import(`./data/languages/${supportedLocale}.json` /* webpackChunkName: "language-data" */)
    .then(languages => cb(null, languages.default))
    .catch(error => cb(error));
};
export const withLanguages = createL10NInjector({
  displayName: 'withLanguages',
  propKey: 'languages',
  propLoadingKey: 'isLoadingLanguages',
  loadLocale: getLanguagesForLocale,
});
