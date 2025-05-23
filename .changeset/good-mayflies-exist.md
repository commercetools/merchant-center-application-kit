---
'@commercetools-frontend/application-shell-connectors': minor
---

We're updating the way the Apollo error link reports unhandled GraphQL errors to Sentry.
In a previous version we configured it so every unhandled error would be reported but now we're changing that implementation so no errors will be reported unless the query includes the (_boolean_) `enableSentryErrorReporting` parameter in the query context.
Example:

```ts
const { loading, data, error } = useMcQuery<
  TFetchLoggedInUserQuery,
  TFetchLoggedInUserQueryVariables
>(LoggedInUserQuery, {
  context: {
    target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
    enableSentryErrorReporting: true,
  },
});
```

This allows for a more granular control of the errors reported to Sentry which is more close to what we had before with the usage of the (now deprecated) `onError` callback of the `useQuery` hook.
