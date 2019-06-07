import * as PropTypes from 'prop-types';
import createL10NInjector from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

const getImportChunk = (locale: string) => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "language-data-de" */ '../data/languages/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "language-data-es" */ '../data/languages/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "language-data-fr-FR" */ '../data/languages/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "language-data-zh-CN" */ '../data/languages/zh-CN.json'
      );
    default:
      return import(
        /* webpackChunkName: "language-data-en" */ '../data/languages/en.json'
      );
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
const getLanguagesForLocale = (locale: string, cb: Function) => {
  const supportedLocale = getSupportedLocale(locale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "language-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  getImportChunk(supportedLocale)
    // Prefer loading `default` (for ESM bundles) and
    // fall back to normal import (for CJS bundles).
    .then(languages => cb(null, languages.default || languages))
    .catch(error => cb(error));
};
export const withLanguages = createL10NInjector({
  displayName: 'withLanguages',
  propKey: 'languages',
  propLoadingKey: 'isLoadingLanguages',
  loadLocale: getLanguagesForLocale,
});
