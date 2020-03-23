const loadMessages = (lang) => {
  let loadAppI18nPromise;
  switch (lang) {
    case 'de':
      loadAppI18nPromise = import(
        './i18n/data/de.json' /* webpackChunkName: "app-i18n-de" */
      );
      break;
    case 'es':
      loadAppI18nPromise = import(
        './i18n/data/es.json' /* webpackChunkName: "app-i18n-es" */
      );
      break;
    default:
      loadAppI18nPromise = import(
        './i18n/data/en.json' /* webpackChunkName: "app-i18n-en" */
      );
  }

  return loadAppI18nPromise.then(
    (result) => result.default,
    (error) => {
      // eslint-disable-next-line no-console
      console.warn(
        `Something went wrong while loading the app messages for ${lang}`,
        error
      );

      return {};
    }
  );
};

export default loadMessages;
