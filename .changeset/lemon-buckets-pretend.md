---
'@commercetools-frontend/actions-global': patch
'@commercetools-frontend/application-components': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/application-shell-connectors': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/l10n': patch
'@commercetools-frontend/permissions': patch
'@commercetools-frontend/react-notifications': patch
'@commercetools-frontend/sdk': patch
'@commercetools-frontend/sentry': patch
'@commercetools-local/visual-testing-app': patch
'@commercetools-website/custom-applications': patch
'@commercetools-website/components-playground': patch
---

Use new TS compiler options `jsx: react-jsx` and `jsxImportSource: @emotion/react`. All unused React imports then have been removed or migrated to destructured named imports.
