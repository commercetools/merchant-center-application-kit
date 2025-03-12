---
'@commercetools-frontend/jest-preset-mc-app': minor
---

We've updated how `console` messages are handled in local environments: previously, `console.warn` and `console.error` messages did not make tests to fail locally but they did in CI; this behaviour led to several cases where we did not realize about an issue until some code reached CI whereas it could be detected locally.

With this change we expect some errors to be caught earlier in the development lifecycle and thus shorten the time to fix them.
