import type { MessageFormatElement } from '@formatjs/icu-messageformat-parser';

import { mergeMessages, mapLocaleToIntlLocale } from './utils';

export type I18NImportData = {
  default: Record<string, string> | Record<string, MessageFormatElement[]>;
};
export type MergedMessages =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

const MOMENT_INCLUDED_METADATA_LOCALE = 'en';

const loadMomentLocaleMetadata = async (locale: string) => {
  // Default English is already included in moment default package
  // so we don't need to load it explicitly
  if (locale === MOMENT_INCLUDED_METADATA_LOCALE) return Promise.resolve();

  try {
    await import(
      /* webpackChunkName: "i18n-moment-locale-[name]" */ `../compiled-data/moment/locales/${locale}.js`
    );
  } catch (error) {
    // If not-found locale was a regional one, we use the main language by default,
    // otherwise we use the default locale (already included).
    const [language, region] = locale.split('-');
    if (region && language !== MOMENT_INCLUDED_METADATA_LOCALE) {
      await import(
        /* webpackChunkName: "i18n-moment-locale-[name]" */ `../compiled-data/moment/locales/${language}.js`
      );
    }
  }
};

const getUiKitChunkImport = (locale: string): Promise<I18NImportData> => {
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

const getAppKitChunkImport = (locale: string): Promise<I18NImportData> => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-de" */ '../compiled-data/de.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-es" */ '../compiled-data/es.json'
      );
    case 'fr-FR':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-fr-FR" */ '../compiled-data/fr-FR.json'
      );
    case 'zh-CN':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-zh-CN" */ '../compiled-data/zh-CN.json'
      );
    case 'ja':
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-ja" */ '../compiled-data/ja.json'
      );
    default:
      return import(
        /* webpackChunkName: "i18n-app-kit-locale-en" */ '../compiled-data/en.json'
      );
  }
};

const getCommunityKitChunkImport = async (
  locale: string
): Promise<I18NImportData> => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return await import(
        /* webpackChunkName: "i18n-community-kit-locale-de" */ '@commercetools-community-kit/i18n/compiled-data/de.json'
      );
    case 'es':
      return await import(
        /* webpackChunkName: "i18n-community-kit-locale-es" */ '@commercetools-community-kit/i18n/compiled-data/es.json'
      );
    case 'fr-FR':
      return await import(
        /* webpackChunkName: "i18n-community-kit-locale-fr-FR" */ '@commercetools-community-kit/i18n/compiled-data/fr-FR.json'
      );
    case 'zh-CN':
      return await import(
        /* webpackChunkName: "i18n-community-kit-locale-zh-CN" */ '@commercetools-community-kit/i18n/compiled-data/zh-CN.json'
      );
    case 'ja':
      return await import(
        /* webpackChunkName: "i18n-community-kit-locale-ja" */ '@commercetools-community-kit/i18n/compiled-data/ja.json'
      );
    default:
      return await import(
        /* webpackChunkName: "i18n-community-kit-locale-en" */ '@commercetools-community-kit/i18n/compiled-data/en.json'
      );
  }
};

// Use default (lazy) so that we will receive one chunk per
// locale. https://webpack.js.org/api/module-methods/#import-
export default async function loadI18n(
  locale: string
): Promise<MergedMessages> {
  // Load moment localizations
  await loadMomentLocaleMetadata(locale);

  // Load ui-kit translations
  const uiKitChunkImport = await getUiKitChunkImport(locale);

  // Load app-kit translations
  const appKitChunkImport = await getAppKitChunkImport(locale);

  // Load community-kit translations
  const communityKitChunkImport = await getCommunityKitChunkImport(locale);

  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  return mergeMessages(
    uiKitChunkImport.default || uiKitChunkImport,
    appKitChunkImport.default || appKitChunkImport,
    communityKitChunkImport.default || communityKitChunkImport
  );
}
