---
'@commercetools-frontend/actions-global': patch
'@commercetools-frontend/application-components': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/application-shell-connectors': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/permissions': patch
'@commercetools-frontend/react-notifications': patch
'@commercetools-frontend/sdk': patch
'@commercetools-frontend/sentry': patch
'@commercetools-local/visual-testing-app': patch
---

Use new TS compiler options `jsx: react-jsx` and `jsxImportSource: @emotion/react`. All React imports then have been removed from the codebase.
