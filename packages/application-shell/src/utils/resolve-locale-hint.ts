import { mapLocaleToIntlLocale } from '@commercetools-frontend/i18n';
import { readLastUserLanguage } from './last-user-language';

/**
 * The catalogue locale to start loading before `FetchLoggedInUser` resolves
 * `user.language`.
 *
 * The last language this browser saw wins over `navigator.language`: a
 * returning user's own setting predicts it far better than their browser
 * chrome, which is the difference between hitting the guess and paying for a
 * second catalogue load.
 *
 * A remembered language is used verbatim; only the browser tag is mapped.
 * `user.language` is a free string, so it can be a regional tag like `de-AT`,
 * and mapping it to `de` would throw away the precision the second load needs:
 * messages resolve per catalogue, but `loadMomentLocales` loads by the full
 * tag, so `de` and `de-AT` are different moment chunks. Passed through, the
 * hint loads both halves and `canPaintShell`'s exact match holds on arrival.
 *
 * The browser tag is mapped because it is arbitrary: reporting `en-US` as the
 * locale next to the `en` catalogue it resolves to makes react-intl miss every
 * message.
 */
const resolveLocaleHint = (): string => {
  const remembered = readLastUserLanguage();
  if (remembered) return remembered;
  return mapLocaleToIntlLocale(window.navigator?.language ?? 'en');
};

export default resolveLocaleHint;
