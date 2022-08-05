---
'@commercetools-frontend/application-shell': minor
---

Extend the utility functions to configure custom HTTP clients to support the configuration for the `/proxy/forward-to` endpoint.

```js
import createHttpUserAgent from '@commercetools/http-user-agent';
import {
  buildApiUrl,
  createHttpClientOptions,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';

const userAgent = createHttpUserAgent({
  name: 'fetch-client',
  version: '2.6.0',
  libraryName: window.app.applicationName,
  contactEmail: 'support@my-company.com',
});

// Simple example using `fetch`.
const data = await executeHttpClientRequest(
  async (options) => {
    const res = await fetch(buildApiUrl('/proxy/forward-to'), {
      method: 'GET',
      ...options,
    });
    const data = await res.json();

    return {
      data,
      statusCode: res.status,
      getHeader: (key) => res.headers.get(key),
    };
  },
  {
    userAgent,
    forwardToConfig: {
      uri: 'https://my-api.com/my-endpoint',
    },
  }
);
```
