# eslint-config-mc-app

## Purpose

Shared ESLint flat config (v9+) for Merchant Center Custom Applications and Custom Views, bundling rules for TypeScript, React, Jest, Testing Library, Cypress, accessibility, and Prettier.

## How To Work Here

Root commands apply. This package has no tests of its own.

## Gotchas

- This package is **excluded from preconstruct** — `index.js` is consumed directly via `require()`. There is no build step and no `dist/` directory.
- The config exports an **ESLint flat config array** (not a legacy `.eslintrc` object). The `index.js` file includes runtime detection that warns if loaded from a legacy `.eslintrc` file.
- Helper modules in `helpers/` (`eslint.js`, `rules-presets.js`, `has-jsx-runtime.js`) are internal utilities required by `index.js` — they must be kept in sync.
- A migration guide at `migrations/v27.md` documents the move from legacy eslintrc to flat config — major version bumps should include corresponding migration docs.
