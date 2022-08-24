---
'@commercetools-frontend/application-shell': patch
---

Add support for requesting specific `claims` to be included in the exchange JWT sent from Merchant Center API to an external API.
Currently we only support requesting a custom claim with logged in user's permissions.

```
// Apollo example
const useExternalApiFetcher = () => {
  const externalApiUrl = useApplicationContext(
    context => context.environment.externalApiUrl
  );
  const { loading, data, error } = useMcQuery(MyQuery, {
    context: createApolloContextForProxyForwardTo({
      uri: externalApiUrl,
      exchangeTokenClaims: ['permissions']
    }),
  });

  return {
    loading,
    data,
    error,
  }
};
```

```
// Custom HTTP client example (using `fetch`)
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
      exchangeTokenClaims: ['permissions']
    },
  }
);
```
