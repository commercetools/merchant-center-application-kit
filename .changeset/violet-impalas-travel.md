---
'@commercetools-frontend/constants': patch
---

Deprecate `X-XSS-Protection` security header, do not include it in the default security headers.

The header is not supported anymore by the browsers and is de-facto replaced by the Content Security Policy (CSP) header.
