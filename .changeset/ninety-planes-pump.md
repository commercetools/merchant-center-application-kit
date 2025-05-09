---
'@commercetools-frontend/application-shell-connectors': minor
'@commercetools-frontend/application-shell': minor
---

Update the Apollo client `error` link to report unhandled errors to Sentry.
The error is only sent to Sentry if it is enabled for the application the the `ApplicationShell` component is used for.
