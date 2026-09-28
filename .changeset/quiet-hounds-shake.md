---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/i18n': minor
---

The translation catalogue now starts loading as soon as the app boots, seeded from the browser locale, instead of waiting for the logged-in user query to resolve `user.language`. The user's own language still wins and replaces the guess as soon as it arrives. You get a faster first render with no change on your side.

If you consume `AsyncLocaleData` or `useAsyncLocaleData` directly, note one contract change: `locale` now reports the locale of the messages you were handed, not the one you asked for. Previously the two could disagree during a language switch, so you could render the new locale's name next to the previous locale's strings.
