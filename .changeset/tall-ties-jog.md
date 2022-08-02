---
'@commercetools-frontend/application-shell': minor
---

New utility functions to configure HTTP requests when using custom HTTP clients.

By default Custom Applications provide [preconfigured HTTP clients](https://docs.commercetools.com/custom-applications/development/data-fetching) for GraphQL and REST API requests.

However, you could use any other HTTP client of your choice, for example `fetch`, `axios`, `swr`, etc.

The main problem with that is the fact that you need to configure these clients on your own, in particular regarding the HTTP headers that should be sent with every request.

This is now possible using some dedicated utility functions. See example usage below:

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
    const res = await fetch(buildApiUrl('/proxy/ctp/channels'), {
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
  { userAgent }
);
```

The implementation example includes all the recommended functionalities such as:

- Defining the required/recommended HTTP headers for the Merchant Center API.
- Automatically renewing the token.

For more information check the [Data fetching](https://docs.commercetools.com/custom-applications/development/data-fetching) documentation.
