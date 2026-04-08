# visual-testing-app

## Purpose

Internal Vite app that renders application-components in isolation for visual regression testing with Percy and Puppeteer.

## Key Context

- Each component has a `*.visualroute.tsx` file exporting `routePath` and `Component` — Vite's `import.meta.glob` auto-discovers these at build time and registers them as routes.
- Matching `*.visualspec.ts` files are Puppeteer tests (run via `jest-puppeteer`) that navigate to each route and take a Percy snapshot.
- The `Suite` and `Spec` test-utils (`src/test-utils/`) provide layout wrappers that standardize visual test rendering.
- Does **not** use `ApplicationShell` or `mc-scripts` — it renders components directly with a mock Apollo client and `TestProviderFlopFlip` for feature flags.
- Visual tests run from the **repo root**, not from this directory.

## How To Work Here

| Task               | Command                                       | Notes                                      |
| ------------------ | --------------------------------------------- | ------------------------------------------ |
| Start dev server   | `pnpm visual-testing-app:start` (from root)   | Serves on default Vite port                |
| Build              | `pnpm visual-testing-app:build` (from root)   | `vite build`                               |
| Preview build      | `pnpm visual-testing-app:preview` (from root) | Serves built output on port 3000           |
| Run visual tests   | `pnpm test:visual` (from root)                | Runs `jest --config jest.visual.config.js` |
| Run VRT with Percy | `pnpm vrt:components` (from root)             | Wraps visual tests in `percy exec`         |

### Adding a new visual test

1. Create a `<component-name>.visualroute.tsx` in `src/components/<component-name>/` exporting `routePath` and `Component`.
2. Create a matching `<component-name>.visualspec.ts` that navigates to the route and calls `percySnapshot`.
3. Use the `Suite` and `Spec` wrappers from `src/test-utils/` for consistent layout.

## Gotchas

- This app consumes **built** package output, not source. You must run `pnpm build` at the repo root before starting.
- Visual tests (`*.visualspec.ts`) are matched by `jest.visual.config.js` at the repo root — they do not run via the package-level `pnpm test`.
- The dev server must be running on port 3000 for `pnpm test:visual` to work (the `HOST` constant in `src/constants.ts` is hardcoded to `http://localhost:3000`).
