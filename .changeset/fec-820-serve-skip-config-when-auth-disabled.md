---
'@commercetools-frontend/mc-scripts': patch
---

`mc-scripts serve` now skips loading the application config when invoked with `--handle-auth-routes=false`. The application config is consumed only by the built-in `/login*` / `/logout*` handlers, so disabling those handlers also makes `processConfig()` (and the dotenv files / `${env:...}` substitutions it requires) unnecessary. Consumers that own the auth routes themselves (e.g. `application-authentication`) can now run `mc-scripts serve --handle-auth-routes=false` as a pure static file server with no environment wiring.

Internally, the decision lives in `cli.ts`: the `serve` action now calls `processConfig()` only when `handleAuthRoutes` is on, and passes the resulting `applicationConfig` (or `undefined`) into the `serve` command. `serve.ts` itself no longer imports `processConfig`; its `applicationConfig` option stays optional and the auth-route branch is gated on it being present.
