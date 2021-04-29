---
'@commercetools-frontend/application-shell': patch
---

Skip `project_key` claim check when validating oidc scope. This allows project switching without having to log in again (when using OIDC flow), thanks to the `x-refreshed-session-token` header.
