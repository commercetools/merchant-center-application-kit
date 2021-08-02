---
'@commercetools-frontend/actions-global': patch
'@commercetools-frontend/application-shell-connectors': patch
'@commercetools-frontend/browser-history': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/react-notifications': patch
---

Move exported types into a separate file, to avoid having type imports/exports in the package entry point.

> This change is only useful in development in the merchant-center-application-kit repository.
