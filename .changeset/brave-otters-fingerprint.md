---
'@commercetools-frontend/mc-html-template': minor
'@commercetools-frontend/mc-scripts': patch
---

Populate `buildFingerprint` on the application environment, so client-side
caches have something to key on that changes when a deploy changes what they
cached. MC apps carry no version number, which is why this did not exist.

It prefers the app's configured `revision`, which the Merchant Center pipeline
already sets to the built git SHA, and falls back to a hash of the compiled
`index.html` when no revision is configured. The fallback is what makes the
value usable in apps and environments that never set one: an empty value would
let a consumer cache every locale under a single key and serve stale
translations indefinitely. A malformed revision throws rather than reaching a
cache key.

The dev-server render paths never reach `compile-html`, so they publish a
constant `DEVELOPMENT_FINGERPRINT` instead of leaving consumers with
`undefined`.

Also fixes a pre-existing bug in the Vite dev plugin: it hashed
`applicationConfig.env` for the CSP while injecting a separately built copy, so
the two diverged whenever `MC_API_URL` was set and the hash no longer covered
the injected script. It now hashes the env it injects.
