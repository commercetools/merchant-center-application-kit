import PropTypes from 'prop-types';
import type { Languages } from './types';
import { createL10NInjector, createL10NHook } from './create-l10n-injector';
import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

type ImportData = {
  default: Languages;
};

const getImportChunk = (locale: string): Promise<ImportData> => {
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
const getLanguagesForLocale = async (locale: string) => {
  const supportedLocale = getSupportedLocale(locale);
  // Use default webpackMode (lazy) so that we generate one file per locale.
  // The files are named like "language-data-en-json.chunk.js" after compilation
  // https://webpack.js.org/api/module-methods/#import-
  const languages = await getImportChunk(supportedLocale);
  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  return languages.default || languages;
};
export const withLanguages = createL10NInjector<Languages>({
  displayName: 'withLanguages',
  propKey: 'languages',
  propLoadingKey: 'isLoadingLanguages',
  loadLocale: getLanguagesForLocale,
});

export const useLanguages = createL10NHook(getLanguagesForLocale);
