# @commercetools-backend/eslint-config-node

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Shared ESLint flat-config preset for Node.js backend projects, consumed by downstream services using `@commercetools-backend/*` packages.

## Key Context

- Exports an ESLint 9 flat config array (not a legacy `.eslintrc` object). The entry point `index.js` includes runtime detection that warns if loaded from a legacy config file.
- Includes configs for Babel-parsed JS, TypeScript-parsed `.ts` files, Jest test files, and Prettier.
- The `helpers/eslint.js` file defines shared constants (status codes, supported extensions).
- The `migrations/` directory contains version-specific migration guides (e.g. `v27.md` for the flat config migration).

## How To Work Here

Follow root monorepo commands. This package has no build step and no tests -- changes are verified by linting downstream consumers.

## Divergences from Root

- Excluded from the preconstruct build pipeline. The entry point is `index.js` (plain CommonJS), not a `src/` directory compiled to `dist/`.
- No `src/` directory or TypeScript source -- all code is in root-level JS files.
