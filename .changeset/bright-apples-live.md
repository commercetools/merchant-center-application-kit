---
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/l10n': patch
'@commercetools-frontend/mc-scripts': patch
---

Date formatting was not correct when using some locales.

We use [moment](https://momentjs.com/) to format dates. The library provides many [locale metadata files](https://github.com/moment/moment/tree/develop/locale) to handle the needs for specifics of regional locales, but we were using only a subset of those (`en`, `en-GB`, `de`, `es`, `fr-FR`, `zh-CN`, `ja`) so, when using a locale out of that subset, the resulting formatted dates were incorrect.

We now support (async) loading all `moment` supported locale metadata files.
