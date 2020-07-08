---
'@commercetools-frontend/application-shell': patch
---

Fixes an issue when using the `forward-to` feature with the Apollo Client, where the additional headers pre-configured in `createApolloContextForProxyForwardTo` have been ignored by the Apollo Link.
