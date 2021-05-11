---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/sdk': minor
---

Add support for sending custom HTTP headers when using the `/proxy/forward-to` endpoint.

See the examples below on how to configure the HTTP headers for both scenarios.

All custom HTTP headers are sent to the Merchant Center API with a prefix `x-forward-header-`, as it allows the Merchant Center API to allow requests with those headers to be forwarded. However, the request forwarded to the external API contains the correct headers without the prefix.

## Usage for Apollo

The `createApolloContextForProxyForwardTo` function now supports passing custom HTTP headers.

```diff
import React from 'react';
import {
  createApolloContextForProxyForwardTo,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const Fetcher = () => {
  // Assuming that the `custom-application-config.json` contains the custom value:
  // `{ additionalEnv: { externalApiUrl: 'https://my-custom-app.com/graphql'} }`
  const externalApiUrl = useApplicationContext(
    context => context.environment.externalApiUrl
  );
  const { loading, data, error } = useMcQuery(MyQuery, {
    context: createApolloContextForProxyForwardTo({
      // The URL to your external API
      uri: externalApiUrl,
+     headers: {
+       'x-foo': 'bar'
+     }
    }),
  });
  // ...
};
```

## Usage for SDK actions

All `forwardTo` proxy actions supports sending custom HTTP headers.

```diff
actions.forwardTo.get({
  uri: 'https://my-custom-app.com/graphql',
+ headers: {
+   'x-foo': 'bar',
+ },
});
```
