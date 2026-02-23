---
'@commercetools-backend/eslint-config-node': major
'@commercetools-frontend/eslint-config-mc-app': major
---

Migrate to ESLint 9 flat config format.

**Peer dependency:** `eslint@^9.0.0` is now required.

## How to update

Both packages ship a `migrations/v27.md` with full step-by-step instructions, structured for both human and AI-assisted migration:

```
node_modules/@commercetools-frontend/eslint-config-mc-app/migrations/v27.md
node_modules/@commercetools-backend/eslint-config-node/migrations/v27.md
```

> "Migrate my eslint config following `node_modules/@commercetools-frontend/eslint-config-mc-app/migrations/v27.md`"

Quick summary:

1. Upgrade ESLint to v9: `eslint@^9.0.0`
2. Replace `.eslintrc.js` with `eslint.config.js`:

```js
const mcAppConfig = require('@commercetools-frontend/eslint-config-mc-app');

module.exports = [
  ...mcAppConfig,
  // your overrides here
];
```

3. Delete `.eslintignore` and inline ignore patterns as `{ ignores: ['dist/', 'build/'] }` in `eslint.config.js`
4. Remove `@rushstack/eslint-patch` if present

## What changed

Both packages now export a flat config array instead of a legacy `.eslintrc` object:

- Config is now an array of objects, each targeting its own file patterns (replaces `overrides`)
- Plugins must be imported as objects, not referenced as strings
- Parsers moved into `languageOptions.parser`
- `env` replaced with explicit globals via the `globals` package
- `extends` removed — plugin rules are configured directly
- `@rushstack/eslint-patch` removed — no longer needed in ESLint 9
- `react-hooks` rules now explicitly applied to `**/*.ts` files (custom hooks without JSX)

Dependency upgrades: `@typescript-eslint/*` v5→v8, `eslint-plugin-jest` v27→v28, `eslint-plugin-react-hooks` v4→v5, `eslint-plugin-testing-library` v5→v7.

## Why

ESLint 9 drops support for the legacy `.eslintrc` format. The flat config system provides explicit, predictable scoping — plugins and parsers apply only to the file patterns they are registered for, eliminating the silent global leaking behavior of ESLint 8 overrides.
