# l10n

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Provides locale-aware reference data (countries, currencies, languages, time zones) as React hooks and higher-order components, consumed by the Merchant Center shell and custom applications.

## Key Context

The `data/` directory contains generated JSON files organized by category (`countries/`, `currencies/`, `languages/`, `time-zones/`), one file per supported locale. These are produced from CLDR data by running the generation script.

Source modules in `src/` (e.g. `country-information.ts`) use explicit dynamic imports with webpack chunk names to load locale-specific data files at runtime.

Uses the `cldr` npm package (devDependency) to generate data, plus `moment-timezone` at runtime for time zone information.

## How To Work Here

- To regenerate the CLDR-derived data files: `pnpm l10n:build` (root) or `pnpm generate-data` (this package).
- Tests: `pnpm --filter @commercetools-frontend/l10n run test`

## Gotchas

- Files in `data/` are generated — do not hand-edit them. They are overwritten by `pnpm l10n:build`.
- Adding a new supported locale requires adding a new dynamic import branch in each `src/*-information.ts` file (explicit switch cases for webpack chunk naming, same pattern as the i18n package).
