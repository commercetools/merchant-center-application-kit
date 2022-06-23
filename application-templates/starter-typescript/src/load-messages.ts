import type {
  TI18NImportData,
  TMergedMessages,
} from '@commercetools-frontend/i18n';

const getChunkImport = (locale: string): Promise<TI18NImportData> => {
  switch (locale) {
    case 'de':
      return import(
        /* webpackChunkName: "app-i18n-de" */
        './i18n/data/de.json'
      );
    default:
      return import(
        /* webpackChunkName: "app-i18n-en" */
        './i18n/data/en.json'
      );
  }
};

const loadMessages = async (locale: string): Promise<TMergedMessages> => {
  try {
    const chunkImport = await getChunkImport(locale);
    // Prefer loading `default` (for ESM bundles) and
    // fall back to normal import (for CJS bundles).
    // @ts-ignore
    return chunkImport.default || chunkImport;
  } catch (error) {
    console.warn(
      `Something went wrong while loading the app messages for ${locale}`,
      error
    );
    return {};
  }
};

export default loadMessages;
