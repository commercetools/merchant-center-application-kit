import { getSupportedLocale } from '@commercetools-frontend/l10n';

export const getBrowserLocale = window => {
  const browserLocale = window && window.navigator && window.navigator.language;
  return getSupportedLocale(browserLocale);
};

export const mergeMessages = (...messages) => Object.assign({}, ...messages);
