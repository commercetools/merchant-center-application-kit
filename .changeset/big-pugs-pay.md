---
'@commercetools-frontend/application-shell': patch
---

In `test-utils` of the ApplicationShell, passing a custom instance of `apolloClient` now correctly passes the `cache` object to the Apollo `MockedProvider`. See https://www.apollographql.com/docs/react/development-testing/testing/#a-note-on-fragment-usage-typepolicies-and-possibletypes.

Furthermore, the `addTypename` option is no longer available in the `test-utils`, as the value is derived by the Apollo cache object. This is important to ensure that the `addTypename` behavior is the same between the Apollo cache and the Apollo `MockedProvider`.

If you wish to disable adding `__typename` fields to the query, you must specify `addTypename: false` to your custom instance of the Apollo client.

```js
import { createApolloClient } from '@commercetools-frontend/application-shell';

createApolloClient({
  cache: {
    addTypename: false,
  },
});
```
