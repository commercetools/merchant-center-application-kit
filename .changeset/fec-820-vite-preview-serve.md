---
'@commercetools-frontend/mc-scripts': patch
---

Add integration tests for the `mc-scripts serve` command so the observable behavior (static file serving, SPA fallback, favicon rewrite, and localhost auth interception for `/login/authorize` and `/logout`) is pinned down before any reimplementation. The command's `run()` function now accepts optional `port`, `publicPath`, and `applicationConfig` overrides and returns the `http.Server` instance — this is backward compatible (all parameters remain optional with the existing defaults) and is used by the test suite to bind to an ephemeral port against a fixture folder. No change to production behavior. Groundwork for FEC-820 (replacing `serve-handler` with Vite's preview server in a follow-up PR).
