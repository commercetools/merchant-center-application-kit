# jest-preset-mc-app

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Jest preset providing default configuration (transforms, module mappers, setup files, environment) for testing Merchant Center Custom Applications and Custom Views.

## Key Context

- Two presets are exposed: `jest-preset.js` (JavaScript-only, `testRegex: \.spec\.jsx?$`) and `typescript/jest-preset.js` (adds `.ts`/`.tsx` extensions). The `jest-preset-for-typescript.js` at root is a backwards-compatibility alias for the TypeScript variant.
- Configuration is customizable via cosmiconfig (`jest-preset-mc-app` key in `package.json` or a dedicated config file) — see `load-config.js` for the merge logic.
- Setup files (`setup-tests.js`, `setup-test-framework.js`) install polyfills, configure `@testing-library/jest-dom`, and apply console-warning silencing based on the loaded config.

## How To Work Here

Root commands apply. This package has no tests of its own.

## Gotchas

- This package is **excluded from preconstruct** — all files are plain JS consumed directly via `require()`. There is no build step and no `dist/` directory.
- The `module-exports-resolver.js` is a custom Jest resolver — changes to it affect module resolution for every downstream test suite.
- The `transform-babel-jest.js` file wires `babel-jest` to `@commercetools-frontend/babel-preset-mc-app` — changes to the babel preset options here must stay compatible with the preset's `create.js` API.
