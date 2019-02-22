import { getSupportedLanguage } from '@commercetools-frontend/l10n';

export const getBrowserLanguage = window => {
  const language = window && window.navigator && window.navigator.language;
  return getSupportedLanguage(language);
};

export const mergeMessages = (...messages) => Object.assign({}, ...messages);
