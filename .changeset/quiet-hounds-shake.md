---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/constants': minor
'@commercetools-frontend/i18n': minor
---

The translation catalogue now starts loading as soon as the app boots instead of waiting for the logged-in user query to resolve `user.language`, so the shell renders sooner. The guess comes from the last language this browser saw, falling back to the browser's own locale on a first visit, and the user's real language always wins once it arrives.

The first render still waits for the user's own catalogue, so a wrong guess never shows content in the wrong language. On a wrong guess you get the same timing as before, never worse.

If you consume `AsyncLocaleData` or `useAsyncLocaleData` directly, note one contract change: `locale` now reports the locale of the messages you were handed, not the one you asked for. Previously the two could disagree during a language switch, so you could render the new locale's name next to the previous locale's strings.
