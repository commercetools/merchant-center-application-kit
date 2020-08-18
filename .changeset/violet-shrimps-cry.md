---
'merchant-center-application-template-starter': minor
'@commercetools-frontend/application-components': minor
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/i18n': minor
'@commercetools-frontend/mc-scripts': minor
'@commercetools-frontend/react-notifications': minor
'playground': minor
'@commercetools-local/visual-testing-app': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Refactor i18n package to consume compiled data from ui-kit translation messages. Furthermore, the `@commercetools-frontend/i18n` now exposes a `compiled-data` folder as well: `@commercetools-frontend/i18n/compiled-data`.
This can be used the load pre-compiled messages and thus improving the runtime performance.

Furthermore, the `mc-scripts extract-intl` command has been deprecated in favor of the more official message extraction with the `@formatjs/cli`: https://formatjs.io/docs/getting-started/message-extraction.
