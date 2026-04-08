# mc-dev-authentication

## Purpose

Connect-compatible middleware that handles authentication routes during local development (`webpack-dev-server`), consumed by `mc-scripts` and downstream Custom Application dev servers.

## Key Context

- Exports `createMcDevAuthenticationMiddleware` -- a middleware that intercepts `/api/health`, `/api/graphql`, and `/login/authorize` routes to simulate the Merchant Center proxy router behavior locally.
- `/api/health` returns a simple health check (used by Cypress login commands to establish the primary origin).
- `/api/graphql` returns 404 with an explanation that GraphQL is only available via the production proxy router.
- `/login/authorize` redirects to the MC API when running against a local OIDC setup.
- Also exports a no-op `transformerLocal` (published as `transformer-local.js`).

## How To Work Here

Follow the root workflow. No package-specific commands. No unit tests exist in this package.
