---
'@commercetools-frontend/mc-scripts': patch
---

Fix the Content-Security-Policy hash for the injected application environment
script on the local dev server. The plugin hashed the app config's own `env`
while injecting a copy overridden from `MC_API_URL`, so `script-src` listed a
hash for a script that was never served and the browser blocked the only script
that defines `window.app`.

Only reachable when the dev server runs outside `env: 'development'` — where
the CSP carries real hashes rather than `'unsafe-inline'` — so in practice the
prod-local dev server with `MC_API_URL` set.
