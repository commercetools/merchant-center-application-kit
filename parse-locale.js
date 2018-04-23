/* This function is needed in order to parse the locale + region that we allow in the user
*  settings. Because we only have messages for `en` and `de`, we need to always get just the
*  first part of the locale (`en-GB` would be `en`) so the app does not break.
*/
const parseLocale = locale =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export default parseLocale;
