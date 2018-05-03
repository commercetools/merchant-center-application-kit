import PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';

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
const getLanguagesForLocale = (locale, cb) =>
  import(`./data/languages/${locale}.json` /* webpackChunkName: "language-data" */)
    .then(languages => cb(null, languages.default))
    .catch(() =>
      // In case the locale is not supported we will return the EN L10N data as fallback
      import(`./data/languages/en.json`).then(languages =>
        cb(new Error(`Unknown locale ${locale}`), languages.default)
      )
    );

export const withLanguages = createL10NInjector({
  displayName: 'withLanguages',
  propKey: 'languages',
  propLoadingKey: 'isLoadingLanguages',
  loadLocale: getLanguagesForLocale,
});
