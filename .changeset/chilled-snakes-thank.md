---
"@commercetools-frontend/application-shell": minor	
---

feat(app-shell): add ability to `skipTokenRetry` for Apollo queries.

The Merchant Center API Gateway assigns a commercetools platform API token in order to access the commercetools HTTP APIs. The access token eventually expires, causing requests to fail with HTTP `401`.
A Custom Application comes with a built-in mechanism to automatically retries unauthorized requests by forcing the Merchant Center API Gateway to assign a new valid API token. This retry mechanism is configured for Apollo queries for certain GraphQL APIs.

However, it is useful for some requests to disable this mechanism to avoid uncalled-for network requests. This is done by specifying a `skipTokenRetry` property on the Apollo query `context` object.

You can skip the process of token refetching as follows:

```js
const query = useQuery(MyGraphQLQuery, {
   context: { skipTokenRetry: true }
})
```
