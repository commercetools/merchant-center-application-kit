# babel-preset-mc-app

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Babel preset providing the standard transform pipeline (env, React, TypeScript, Emotion, formatjs) for all Merchant Center Custom Applications and Custom Views.

## How To Work Here

Root commands apply. The single test file is `production.spec.js`.

## Gotchas

- This package is **excluded from preconstruct** — it ships plain JS files (`index.js`, `create.js`, `production.js`, `development.js`, `test.js`) that are consumed directly via `require()`. There is no build step and no `dist/` directory.
- The `create.js` file is the core logic — it branches on `NODE_ENV`/`BABEL_ENV` to return different preset/plugin configurations. Changes here affect every downstream build and test run.
- The `loose` mode flag on class-properties, private-methods, and private-property-in-object transforms must stay in sync — mismatched loose settings cause Babel compilation errors.
