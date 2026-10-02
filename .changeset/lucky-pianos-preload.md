---
'@commercetools-frontend/mc-scripts': minor
---

Emit `<link rel="modulepreload">` for the authenticated shell chunks in the
built `index.html`, so they are fetched alongside the entry instead of waiting
for it to execute and discover them. Measured on a Vite-built Merchant Center
app, the shell chunks finished 455ms after the boot locale chunks, which is the
delay this targets. The after measurement is still to come.

Vite's `build.modulePreload` was already enabled by default, but it only
preloads the entry's _static_ cross-chunk imports and our entry has none, so no
tags were emitted. This resolves a small set of shell chunk-name prefixes plus
their transitive static imports and injects them through
`modulePreload.resolveDependencies`.

`application-shell-splitter` is deliberately excluded even though it belongs to
the same wave: it alone is ~1.2MB and pulls a further ~172KB, which would put
~1.5MB of high-priority preload in parallel with the 2.3MB entry that is the
real critical path. Including it needs a throttled measurement first. With it
out, the preload set is ~128KB.

Custom Views skip this entirely. They import from the same package, so their
builds emit these chunks too, but `CustomViewShell` never renders the navbar or
project container — the hints would be ~128KB of preload for modules the page
does not use. The build decides from which configuration file is present, so
nothing is needed on your side.

If a shell chunk is renamed or de-lazied so that only _some_ prefixes resolve,
the build logs a warning and continues with a smaller preload set. Those
modules then load a round trip later, as they did before this change — nothing
breaks at runtime.
