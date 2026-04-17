# mc-scripts

See root `AGENTS.md` for monorepo-wide context.

## Purpose

CLI and build toolchain (`mc-scripts start`, `build`, `compile-html`, `serve`, `config-sync`, `login`) used by downstream Custom Applications and Custom Views to develop and produce production bundles.

## Key Context

- Provides both **Webpack** and experimental **Vite** bundlers — command implementations live in `src/commands/` with separate `start.ts`/`build.ts` (Webpack) and `start-vite.ts`/`build-vite.ts` (Vite) variants.
- Multiple preconstruct entrypoints: `index.ts`, `cli.ts`, `application-runtime.ts`, `postcss.ts`, `webpack.ts`, and `webpack-loaders/i18n-message-compilation-loader.ts`. Changes to any entrypoint affect downstream consumers.
- The `bin/cli.js` file requires the built `cli` entrypoint (`@commercetools-frontend/mc-scripts/cli`) — it must be built (or `preconstruct dev` linked) before the CLI works locally.
- Depends heavily on `@commercetools-frontend/application-config` for loading and validating custom application configuration, and on `@commercetools-frontend/mc-html-template` for HTML generation.

## How To Work Here

Root commands apply. Run tests with `pnpm --filter @commercetools-frontend/mc-scripts run test` from the repo root.

## Gotchas

- This package is built by preconstruct. Source changes require a build step (or `preconstruct dev` symlinks) before the CLI or exports are usable locally.
- The Webpack and PostCSS config files in `src/config/` are re-exported as public API — breaking changes here affect every downstream Custom Application build.
