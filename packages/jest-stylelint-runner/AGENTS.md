# jest-stylelint-runner

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Custom Jest runner that transforms CSS through PostCSS before running stylelint, used by the monorepo's `pnpm lint:css` command.

## How To Work Here

Root commands apply. The test file is `run.spec.js`, with fixtures in `__fixtures__/` and mocks in `__mocks__/`.

## Gotchas

- This package is **excluded from preconstruct** — `index.js` and `run.js` are plain JS consumed directly. There is no build step and no `dist/` directory.
- The runner loads PostCSS config from the project root via `postcss-load-config` — it depends on a valid PostCSS configuration existing at the consuming project's root.
