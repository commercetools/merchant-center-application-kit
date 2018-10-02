// TODO: remove once you have more than one
/* eslint-disable import/prefer-default-export */

export const getMatchingMomentCode = lang => {
  switch (lang) {
    case 'en':
      return 'en-gb';
    case 'de':
      return 'de';
    case 'es':
      return 'es';
    default:
      return 'en-gb';
  }
};
