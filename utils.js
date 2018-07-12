// TODO: remove once you have more than one
/* eslint-disable import/prefer-default-export */

export const getMatchingMomentCode = (lang, country) => {
  switch (lang) {
    case 'en':
      switch (country) {
        case 'au':
          return 'en-au';
        case 'ca':
          return 'en-ca';
        case 'gb':
          return 'en-gb';
        case 'ie':
          return 'en-ie';
        case 'il':
          return 'en-il';
        case 'nz':
          return 'en-nz';
        default:
          return 'en-gb';
      }
    case 'de': {
      switch (country) {
        case 'at':
          return 'de-at';
        case 'ch':
          return 'de-ch';
        default:
          return 'de';
      }
    }
    case 'es': {
      switch (country) {
        case 'us':
          return 'es-us';
        case 'do':
          return 'es-do';
        default:
          return 'es';
      }
    }
    default:
      return 'en-gb';
  }
};
