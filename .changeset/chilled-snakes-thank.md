---
"@commercetools-frontend/application-shell": minor	
---

feat(app-shell): add ability to `skipTokenRetry` via context.

The commercetools Platform token is renewed once whenever it expired. This is an automatic mechanism which retries a failed request responding with `401` once based on the GraphQL target.

It is however useful for some requests to disable this mechanism to avoid uncalled-for network requests. We introduced a `skipTokenRetry` property on the GraphQL `context` for this.

You can skip the process of token refetching as follows:

```js
const query = useQuery(MyGraphQLQuery, {
   context: { skipTokenRetry: true }
})
```
