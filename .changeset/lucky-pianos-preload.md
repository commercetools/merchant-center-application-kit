---
'@commercetools-frontend/mc-scripts': minor
---

Emit `<link rel="modulepreload">` for the authenticated shell chunk graph in the
built `index.html`, so those chunks are fetched alongside the entry instead of
waiting for it to execute and discover them. Measured on a Vite-built Merchant
Center app, the shell chunks finished 455ms after the boot locale chunks, which
is the saving this removes.

Vite's `build.modulePreload` was already enabled by default, but it only
preloads the entry's _static_ cross-chunk imports and our entry has none, so no
tags were emitted. This resolves a small set of shell chunk-name prefixes plus
their transitive static imports and injects them through
`modulePreload.resolveDependencies`.

Note for custom applications and Custom Views: the shell chunks are emitted in
those builds too (they import from the same package), so their `index.html` will
also carry these preload tags even though a Custom View mounts `CustomViewShell`
and never renders the navbar or project container. The build is unaffected, but
those apps fetch roughly 124KB they do not use.
