---
'@commercetools-frontend/sentry': minor
---

Upgrade the Sentry SDK (`@sentry/browser`, `@sentry/react`) from 8.55.2 to 10.76.0 and enable `graphqlClientIntegration`, so GraphQL `http.client` spans are named after the operation (for example `POST https://mc-api.../graphql (query FetchProject)`) instead of the bare endpoint URL. The `@sentry/types` dependency is replaced by `@sentry/core`.

Behavior changes to be aware of:

- Alerts or dashboards that match span descriptions of the form `POST .../graphql` need updating, since the operation name is now part of the description. The `mc.*` loading-performance measurements are unaffected.
- The Sentry SDK now targets an ES2020 browser baseline.
- `addPerformanceMeasurementsToTransaction` now takes and returns the `TransactionEvent` type from `@sentry/core` v10 instead of `@sentry/types` v8. Callers that type the event with Sentry v8 types need to move to v10 types. `reportErrorToSentry` is unchanged: its `extra` option uses the same `Extra` / `Extras` types as before.
- Sessions follow the v10 SDK behavior: the first history navigation after a page load starts a new session (v8 skipped it), and the initial session is sent once the page is idle or hidden and re-sent when the user is set, so it carries the user. Session-based numbers (session counts, release adoption, crash-free rates) shift at rollout.
- Event and transaction data sent to Sentry is meant to stay the same. v8 relied on Sentry inferring the client IP (used for event geography), while v10 tells Sentry not to infer it unless `sendDefaultPii` is set. `boot()` opts into the inference on its own (`infer_ip: 'auto'`) instead of enabling `sendDefaultPii`, which would also send cookies, headers and request bodies.
- `graphqlClientIntegration` would attach the GraphQL query text (`graphql.document`) to breadcrumbs and spans by default. `boot()` strips it, because a query with an inline literal could carry personal data. The operation name (`graphql.operation`, and the span name) is kept.
