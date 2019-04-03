import { addLocaleData } from 'react-intl';
import {
  extractLanguageTagFromLocale,
  mapLocaleToMomentLocale,
  mapLocaleToIntlLocale,
} from './utils';

const getReactIntlChunkImport = locale => {
  // NOTE: react-intl only has locale data for language tags
  const language = extractLanguageTagFromLocale(locale);
  switch (language) {
    case 'de':
      return import(/* webpackChunkName: "react-intl-data-de" */ 'react-intl/locale-data/de');
    case 'es':
      return import(/* webpackChunkName: "react-intl-data-es" */ 'react-intl/locale-data/es');
    case 'fr':
      return import(/* webpackChunkName: "react-intl-data-fr" */ 'react-intl/locale-data/fr');
    case 'zh':
      return import(/* webpackChunkName: "react-intl-data-zh" */ 'react-intl/locale-data/zh');
    default:
      return import(/* webpackChunkName: "react-intl-data-en" */ 'react-intl/locale-data/en');
  }
};

const getMomentChunkImport = locale => {
  const momentLocale = mapLocaleToMomentLocale(locale);
  switch (momentLocale) {
    case 'de':
      return import(/* webpackChunkName: "i18n-moment-locale-de" */ 'moment/locale/de');
    case 'es':
      return import(/* webpackChunkName: "i18n-moment-locale-es" */ 'moment/locale/es');
    case 'fr':
      return import(/* webpackChunkName: "i18n-moment-locale-fr" */ 'moment/locale/fr');
    case 'zh-cn':
      return import(/* webpackChunkName: "i18n-moment-locale-zh-cn" */ 'moment/locale/zh-cn');
    default:
      return import(/* webpackChunkName: "i18n-moment-locale-en-gb" */ 'moment/locale/en-gb');
  }
};

const getLocalizedStringsChunkImport = locale => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(/* webpackChunkName: "i18n-app-kit-locale-de" */ './data/de.json');
    case 'es':
      return import(/* webpackChunkName: "i18n-app-kit-locale-es" */ './data/es.json');
    case 'fr-FR':
      return import(/* webpackChunkName: "i18n-app-kit-locale-fr-FR" */ './data/fr-FR.json');
    case 'zh-CN':
      return import(/* webpackChunkName: "i18n-app-kit-locale-zh-CN" */ './data/zh-CN.json');
    default:
      return import(/* webpackChunkName: "i18n-app-kit-locale-en" */ './data/en.json');
  }
};

// Use default (lazy) so that we will receive one chunk per
// locale. https://webpack.js.org/api/module-methods/#import-
export default async function loadI18n(locale) {
  const reactIntlChunkImport = await getReactIntlChunkImport(locale);
  addLocaleData(reactIntlChunkImport.default);

  await getMomentChunkImport(locale);

  const intlChunkImport = await getLocalizedStringsChunkImport(locale);
  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  return intlChunkImport.default || intlChunkImport;
}
