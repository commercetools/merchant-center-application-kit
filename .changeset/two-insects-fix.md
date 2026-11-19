---
'@commercetools-frontend/application-config': minor
---

Add an `exports` map so the package resolves under native Node ESM.

The package had no `exports` field, so `@commercetools-frontend/application-config/ssr` was a plain directory. Node's ESM loader refuses directory imports (`ERR_UNSUPPORTED_DIR_IMPORT`), which broke any consumer that runs or bundles the package without a bundler that resolves directories, such as `tsx` or `node dist/index.mjs`. Vite and other bundlers already handled it, so the problem only appeared in backend services.

The map exposes the root entry and the `./ssr` entry with `types`, `node`, `import` and `require` conditions, pointing at the existing `dist` builds. A `./package.json` entry and a `./*` wildcard keep existing deep imports working.

No code changes: the same files are served, only the resolution rules differ.
