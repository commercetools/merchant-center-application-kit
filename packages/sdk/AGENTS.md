# @commercetools-frontend/sdk

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Redux middleware and action creators for making HTTP requests to the Merchant Center API Gateway, consumed by Custom Applications and the application shell.

## Key Context

- Depends on the legacy `@commercetools/sdk-client` (v3) and `@commercetools/api-request-builder` for building request URIs and executing HTTP calls — these are not the newer `@commercetools/sdk-client-v2`.
- All API requests are Redux actions with `type: 'SDK'`. The middleware intercepts these, builds the URI, executes the HTTP call via the SDK client, and dispatches `SHOW_LOADING`/`HIDE_LOADING` actions.
- Supports two action shapes: URI-based (`{ uri: string }`) and service-based (`{ service: string, options: object }`). Service-based actions use `api-request-builder` to construct the URI from a project key.
- The `forwardTo` action namespace proxies requests to external backend services via the MC API Gateway's `/proxy/forward-to` endpoint, translating headers to `x-forward-header-*` prefixed versions.
- Has a secondary entrypoint `@commercetools-frontend/sdk/test-utils` that exports `createTestMiddleware` for mocking SDK actions in tests. This entrypoint is configured in `preconstruct.entrypoints`.
- Peer-depends on `redux` and `react-redux`.

## How To Work Here

Follows root workflows. Test with `pnpm --filter @commercetools-frontend/sdk run test`.

## Gotchas

- The `test-utils` secondary entrypoint is a separate preconstruct entrypoint. If you add or rename files under `src/test-utils/`, ensure the preconstruct config in `package.json` stays in sync.
- The `del` action creator (not `delete`) is used because `delete` is a reserved keyword in JavaScript.
- The middleware automatically retries on 401 with an `X-Force-Token: true` header to handle stale cached OAuth tokens. Do not add redundant retry logic.
