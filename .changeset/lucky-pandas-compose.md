---
'@commercetools-frontend/mc-html-template': patch
'@commercetools-frontend/constants': minor
---

Compose the inline application-environment script in one place.

That script is allowed by a SHA-256 hash in `script-src`, and the hash is
computed over its exact bytes. `process-headers` and `replace-html-placeholders`
each hand-wrote their own copy of the script body, so any edit had to land in
both and a miss would silently CSP-block the only script that defines
`window.app`. Both now consume `createApplicationEnvironmentScript`.

No behaviour change: the CSP snapshot is unchanged, and a new test asserts the
hash `process-headers` computes matches the bytes `replace-html-placeholders`
injects.

Also adds an optional `buildFingerprint` field to `ApplicationRuntimeEnvironment`,
which the composer publishes as `window.__BUILD_FINGERPRINT__` when set. Nothing
populates it yet. It identifies deployed content for client-side cache keys, not
a deploy or commit (`revision` remains that). Internal and unstable: not part of
the supported custom application or Custom View API.
