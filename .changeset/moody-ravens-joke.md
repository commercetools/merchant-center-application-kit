---
'@commercetools-frontend/application-shell-connectors': patch
'@commercetools-frontend/application-shell': patch
---

Expose HTTP utilities from `application-shell-connectors` package.

- `buildApiUrl`
- `createApolloClient`
- `createApolloContextForProxyForwardTo`
- `createHttpClientOptions`
- `executeHttpClientRequest`
- `getMcApiUrl`
- `selectUserId`
- `selectProjectKeyFromUrl`
- `useMcQuery`
- `useMcLazyQuery`
- `useMcMutation`

For backwards compatibility these are also exported from the `application-shell` package.
