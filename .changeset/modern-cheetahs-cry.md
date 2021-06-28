---
'@commercetools-frontend/react-notifications': patch
---

Removing logging API errors to `console.error` in test environments. Now loggin only in development.

Prevent <ApiErrorNotification /> component from polluting console with the `console.error` messages in both `test` and `production` environments.
