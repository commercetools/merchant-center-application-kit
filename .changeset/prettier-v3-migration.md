---
'@commercetools-frontend/eslint-config-mc-app': major
'@commercetools-backend/eslint-config-node': major
'@commercetools-frontend/l10n': patch
'@commercetools-frontend/create-mc-app': patch
---

Upgrade Prettier from v2 to v3.

## `@commercetools-frontend/eslint-config-mc-app` / `@commercetools-backend/eslint-config-node` (major)

Both shared ESLint configs now bundle `prettier@^3.9.6` and
`eslint-plugin-prettier@^5.5.6` (up from `prettier@2.8.8` and
`eslint-plugin-prettier@^4.2.1`). `eslint-plugin-prettier@5` only supports
`prettier@>=3.0.0`, so consumers of these configs must upgrade their own
`prettier` dependency to v3 as well.

**Consumer migration steps:**

1. Upgrade your own `prettier` dependency to `^3.0.0` (and `eslint-plugin-prettier`
   to `^5.0.0` if you depend on it directly).
2. If you call the `prettier` package's API directly (e.g. in build scripts or
   codemods), note that Prettier v3's primary APIs are now **async-only**:
   `format()`, `check()`, `resolveConfig()`, `resolveConfigFile()`, and
   `getFileInfo()` all return Promises, and the `.sync()` variants
   (`resolveConfig.sync()`, `resolveConfigFile.sync()`, `getFileInfo.sync()`)
   have been removed. Use `@prettier/sync` if you need a synchronous shim.
3. Prettier v3 is distributed as ESM (with a CJS-compatible entry point for
   `require()`), and plugin loading moved from `require()` to `import()`.
   This only matters if you register custom Prettier plugins.
4. Re-run `prettier --write` (or your project's format script) across your
   codebase after upgrading. Prettier v3's formatting engine changed several
   long-standing output decisions independent of any config changes —
   most visibly, indentation of nested ternaries and a new trailing comma
   after the last generic type parameter — so expect a one-time reformat
   diff even if your `.prettierrc` is unchanged.
5. If your `.prettierrc` does **not** explicitly set `trailingComma`, note
   that Prettier v3 changed the default from `"es5"` to `"all"`. This
   repository's own `.prettierrc` (and the application/custom-view templates
   it ships) already pin `trailingComma: "es5"` explicitly, so this default
   change does not affect projects scaffolded from this repo, but it will
   affect any downstream project that relied on the old default implicitly.

No ESLint rule behavior changed as part of this migration — `eslint` itself
stays on the current major version in this release. See the PR description
for why the ESLint v10 half of this pathfinder was not shipped.

## `@commercetools-frontend/l10n` / `@commercetools-frontend/create-mc-app` (patch)

Internal build/CLI scripts that called `prettier.format()` /
`prettier.resolveConfig.sync()` directly were updated to use Prettier v3's
async API (`await prettier.format(...)`, `await prettier.resolveConfig(...)`).
This is an internal implementation detail with no change to either package's
public API or CLI behavior.
