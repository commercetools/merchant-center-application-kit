const getChunkImport = (locale) => {
  switch (locale) {
    case 'de':
      return import(
        /* webpackChunkName: "app-i18n-de" */ './i18n/data/de.json'
      );
    default:
      return import(
        /* webpackChunkName: "app-i18n-en" */ './i18n/data/en.json'
      );
  }
};

const loadMessages = async (locale) => {
  try {
    const chunkImport = await getChunkImport(locale);
    // Prefer loading `default` (for ESM bundles) and
    // fall back to normal import (for CJS bundles).
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
