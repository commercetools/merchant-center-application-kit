---
'@commercetools-frontend/mc-scripts': patch
---

Add a `--handle-auth-routes` flag to `mc-scripts serve`. When set, requests to `/login*` and `/logout*` are passed through to the SPA fallback instead of being intercepted by the built-in localhost-redirect / clear-session-text / 404 handlers. Use this for applications that own those routes themselves (e.g. `application-authentication`). Default behavior is unchanged.
