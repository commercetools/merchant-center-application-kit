# @commercetools-backend/express

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Express.js middleware and utilities for verifying Merchant Center JWT session tokens in custom backend services that sit behind the MC API proxy.

## Key Context

- Uses the `jose` library to verify JWTs against the MC API Gateway's JWKS endpoint.
- Maps cloud identifiers (e.g. `gcp-eu`, `aws-us`) to MC API issuer URLs, with legacy hostname fallback for v1 proxy clients.
- Exports two main entry points: `createSessionAuthVerifier` (standalone verifier function) and `createSessionMiddleware` (Express middleware that calls the verifier and attaches `request.session`).

## How To Work Here

Follow root monorepo commands. Run tests scoped to this package:

```sh
pnpm --filter @commercetools-backend/express run test
```

## Gotchas

- The JWKS client is cached per issuer in a module-level `Map`. Tests use `msw` to mock the JWKS and token verification endpoints -- if you add new cloud identifiers, you need matching mock fixtures.
