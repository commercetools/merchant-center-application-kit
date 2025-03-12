---
'@commercetools-backend/express': patch
---

Define `engines.node` version requirement.

Additionally, simplify the JWT token validation using `jose`. As a result, the option `jwks` of `createSessionMiddleware` is no longer needed and is marked as deprecated.
