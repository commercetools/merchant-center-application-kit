# sentry

Subdirectory context — supplements the root `AGENTS.md`. Only includes what
an agent needs to know to work safely in this package specifically.

## Purpose

Wraps the Sentry SDK (`@sentry/react`, `@sentry/browser`) to provide error reporting initialization (`boot`), a `reportErrorToSentry` helper, and React components (`SentryUserTracker`, `SentryUserLogoutTracker`) for the Merchant Center shell.

## Key Context

- `boot()` reads configuration from `window.app` (the runtime environment object from `@commercetools-frontend/constants`) to initialize Sentry with the correct DSN, release, and environment.
- PII fields (`firstName`, `lastName`, `email`) are automatically redacted in `beforeSend`.
- Integrates with `@commercetools-frontend/browser-history` for Sentry's React Router v5 browser tracing.

## How To Work Here

Follow root conventions. Tests: `pnpm --filter @commercetools-frontend/sentry run test`
