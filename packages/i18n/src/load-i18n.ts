import type { MessageFormatElement } from 'intl-messageformat-parser';

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
  default: Record<string, string> | Record<string, MessageFormatElement[]>;
};
type AppKitImportData = {
  default: Record<string, string> | Record<string, MessageFormatElement[]>;
};
type MergedMessages =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

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
    case 'ja':
      return import(
        /* webpackChunkName: "i18n-moment-locale-ja" */ 'moment/locale/ja'
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
        /* webpackChunkName: "i18n-ui-kit-locale-de" */ '@commercetools-uikit/i18n/compiled-data/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-es" */ '@commercetools-uikit/i18n/compiled-data/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-fr-FR" */ '@commercetools-uikit/i18n/compiled-data/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-zh-CN" */ '@commercetools-uikit/i18n/compiled-data/zh-CN.json'
      );
    case 'ja':
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-ja" */ '@commercetools-uikit/i18n/compiled-data/ja.json'
      );
    default:
      return import(
        /* webpackChunkName: "i18n-ui-kit-locale-en" */ '@commercetools-uikit/i18n/compiled-data/en.json'
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
        /* webpackChunkName: "i18n-app-kit-locale-fr-FR" */ '../data/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-zh-CN" */ '../data/zh-CN.json'
      );
    case 'ja':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-ja" */ '../data/ja.json'
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
