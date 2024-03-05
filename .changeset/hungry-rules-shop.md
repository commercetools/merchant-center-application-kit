---
'@commercetools-frontend/application-shell': patch
---

The `apolloClient` property in the `CustomViewShell` component was not being used internally, making it impossible for consumers to user a custom Apollo client.
