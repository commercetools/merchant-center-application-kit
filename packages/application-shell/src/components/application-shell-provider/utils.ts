import { getSupportedLocale } from '@commercetools-frontend/l10n';

// eslint-disable-next-line import/prefer-default-export
export const getBrowserLocale = (win: Window) => {
  const browserLocale = win && win.navigator && win.navigator.language;
  return getSupportedLocale(browserLocale);
};
