// TODO: remove once you have more than one
/* eslint-disable import/prefer-default-export */

const supportedLocales = {
  en: ['au', 'ca', 'gb', 'ie', 'il', 'nz'],
  es: ['us', 'do'],
  de: ['at', 'ch'],
};

export const getMatchingMomentCode = (lang, country) => {
  switch (lang) {
    case 'en':
      return supportedLocales.en.includes(country)
        ? `${lang}-${country}`
        : 'en-gb';
    case 'de':
      return supportedLocales.de.includes(country)
        ? `${lang}-${country}`
        : 'de';
    case 'es':
      return supportedLocales.es.includes(country)
        ? `${lang}-${country}`
        : 'es';
    default:
      return 'en-gb';
  }
};
