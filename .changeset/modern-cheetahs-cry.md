---
'@commercetools-frontend/react-notifications': patch
---

fix(api-error): log api errors to console only in development env

Prevent <ApiErrorNotification /> component from polluting console with the `console.error` messages in both `test` and `production` environments.
