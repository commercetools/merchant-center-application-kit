---
'@commercetools-frontend/mc-scripts': patch
---

Add a `--handle-auth-routes <enabled>` option to `mc-scripts serve` (default `true`). Pass `--handle-auth-routes false` to let `/login*` and `/logout*` requests fall through to the SPA fallback instead of being intercepted by the built-in localhost-redirect / clear-session-text / 404 handlers. Use this for applications that own those routes themselves (e.g. `application-authentication`). Default behavior is unchanged.
