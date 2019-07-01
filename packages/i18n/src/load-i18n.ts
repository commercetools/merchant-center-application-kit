import moment from 'moment';
import {
  mergeMessages,
  mapLocaleToMomentLocale,
  mapLocaleToIntlLocale,
} from './utils';

type MomentImportData = {
  default: moment.Locale;
};
type UIKitImportData = {
  default: {
    [key: string]: string;
  };
};
type AppKitImportData = {
  default: {
    [key: string]: string;
  };
};
type MergedMessages = {
  [key: string]: string;
};

const getMomentChunkImport = (locale: string): Promise<MomentImportData> => {
  const momentLocale = mapLocaleToMomentLocale(locale);
  switch (momentLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "i18n-moment-locale-de" */ 'moment/locale/de'
      );
    case 'es':
      return import(
        /* webpackChunkName: "i18n-moment-locale-es" */ 'moment/locale/es'
      );
    case 'fr':
      return import(
        /* webpackChunkName: "i18n-moment-locale-fr" */ 'moment/locale/fr'
      );
    case 'zh-cn':
      return import(
        /* webpackChunkName: "i18n-moment-locale-zh-cn" */ 'moment/locale/zh-cn'
      );
    default:
      return import(
        /* webpackChunkName: "i18n-moment-locale-en-gb" */ 'moment/locale/en-gb'
      );
  }
};

const getUiKitChunkImport = (locale: string): Promise<UIKitImportData> => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-de" */ '@commercetools-frontend/ui-kit/i18n/data/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-es" */ '@commercetools-frontend/ui-kit/i18n/data/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-fr-FR" */ '@commercetools-frontend/ui-kit/i18n/data/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-zh-CN" */ '@commercetools-frontend/ui-kit/i18n/data/zh-CN.json'
      );
    default:
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-en" */ '@commercetools-frontend/ui-kit/i18n/data/en.json'
      );
  }
};

const getAppKitChunkImport = (locale: string): Promise<AppKitImportData> => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-de" */ '../data/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-es" */ '../data/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-fr-FR" */ '../data/fr_FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-zh-CN" */ '../data/zh_CN.json'
      );
    default:
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-en" */ '../data/en.json'
      );
  }
};

// Use default (lazy) so that we will receive one chunk per
// locale. https://webpack.js.org/api/module-methods/#import-
export default async function loadI18n(
  locale: string
): Promise<MergedMessages> {
  // Load moment localizations
  await getMomentChunkImport(locale);

  // Load ui-kit translations
  const uiKitChunkImport = await getUiKitChunkImport(locale);

  // Load app-kit translations
  const appKitChunkImport = await getAppKitChunkImport(locale);

  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  return mergeMessages(
    uiKitChunkImport.default || uiKitChunkImport,
    appKitChunkImport.default || appKitChunkImport
  );
}
