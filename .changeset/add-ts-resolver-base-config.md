---
'@commercetools-frontend/eslint-config-mc-app': patch
---

Add `eslint-import-resolver-typescript` to the base ESLint config block so JS/JSX files can resolve non-hoisted pnpm packages and packages using only the `exports` field.
