import history from '@commercetools-frontend/browser-history';
import { getSupportedLocale } from '@commercetools-frontend/l10n';

export const getBrowserHistory = () => history;

export const getBrowserLocale = (win: Window) => {
  const browserLocale = win && win.navigator && win.navigator.language;
  return getSupportedLocale(browserLocale);
};
