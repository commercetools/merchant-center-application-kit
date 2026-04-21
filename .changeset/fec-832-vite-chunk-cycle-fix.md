---
'@commercetools-frontend/mc-scripts': patch
---

Fix Vite production build crashing at startup with a TDZ `TypeError` (e.g. `"aM is undefined"`) in `@commercetools-uikit/icons` caused by a chunk-level cycle between the `icons` and `app-shell` chunks.

The Vite build no longer passes `output.manualChunks` to Rollup — the declarative form did not claim transitive deps, so shared packages (`@babel/runtime-corejs3`, `@emotion/react`, uikit internals) could land in one chunk that was also imported back from another, producing a runtime cycle on first evaluation. Rollup's default chunking handles co-location correctly. The Webpack build is unchanged.

Adds `vite-plugin-chunk-cycle-check`, a build-time regression guard that fails the build if the emitted chunk graph contains circular imports.
