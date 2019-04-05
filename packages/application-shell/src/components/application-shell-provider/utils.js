import { getSupportedLocale } from '@commercetools-frontend/l10n';

// eslint-disable-next-line import/prefer-default-export
export const getBrowserLocale = window => {
  const browserLocale = window && window.navigator && window.navigator.language;
  return getSupportedLocale(browserLocale);
};
