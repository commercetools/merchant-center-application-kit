---
'@commercetools-frontend/application-shell': major
---

Remove the experimental render method `experimentalRenderAppWithRedux` from the `test-utils`.

Instead, you can now pass to the `renderApp` and `renderAppWithRedux` methods the `disableApolloMocks` option. When this option is set to `true`, the real `ApolloProvider` is rendered instead of the Apollo `MockProvider`.
This is useful if you want to mock requests at the network level, for example when using [Mock Service Worker](https://mswjs.io/).

Additionally, you can also pass a custom `apolloClient` instance together with the `disableApolloMocks` option. This is only useful when your Custom Application uses a custom `apolloClient`, for example for configuring the cache policies.
