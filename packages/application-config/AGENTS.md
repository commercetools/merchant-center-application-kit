# application-config

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Loads, validates, and transforms Custom Application and Custom View configuration files (`custom-application-config.*` / `custom-view-config.*`) into runtime configuration objects consumed by the build toolchain and shell.

## Key Context

- **Node.js only**: This package runs at build time and in SSR — it uses `fs`, `path`, `cosmiconfig`, `ajv`, `jsdom`/`dompurify`. It does not run in the browser.
- **Config loading**: Uses `cosmiconfig` (with TypeScript loader) to find and load `custom-application-config.{ts,js,json,mjs,cjs}` or `custom-view-config.*` files. See `src/load-config.ts`.
- **JSON Schema validation**: `custom-application.schema.json` and `custom-view.schema.json` at the package root define the configuration shape. Validation uses `ajv`. These schema files are **auto-generated** — see the `build-schemas` script in `package.json`.
- **Generated TypeScript types**: `src/schemas/generated/` contains TypeScript interfaces generated from the JSON schemas via `json-schema-to-typescript`. Regenerate with `pnpm build-schema:custom-application` or `pnpm build-schema:custom-view`.
- **Two preconstruct entry points**: `./index.ts` (main config processing API) and `./ssr.ts` (permission key formatters used by `application-shell/ssr` and test-utils).
- **Permission formatters** (`src/formatters.ts`): `entryPointUriPathToPermissionKeys` and `entryPointUriPathToResourceAccesses` convert entry point URI paths into permission key objects. These are re-exported by `application-shell`.

## How To Work Here

Root workflows apply, plus:

- After modifying `custom-application.schema.json` or `custom-view.schema.json`, run `pnpm build-schemas` to regenerate the TypeScript types in `src/schemas/generated/`.
- Lint-staged also regenerates the schema types on commit when schema files change.

## Gotchas

- **Do not hand-edit** `custom-application.schema.json`, `custom-view.schema.json`, or files in `src/schemas/generated/`. The schema JSON files are the source of truth for validation; the generated `.ts` files are derived from them. Edit the JSON schemas, then run `pnpm build-schemas`.
- The `ssr` entry point is imported by `application-shell` in both Node.js and browser contexts (via the `ssr` sub-export). The `formatters.ts` it re-exports must remain free of Node.js-only imports.
