# application-shell

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Runtime shell that bootstraps every Merchant Center customization — provides authentication, routing, navigation chrome, error boundaries, Redux store, Apollo Client, i18n, and feature flags so custom app code only implements business logic.

## Key Context

- **State management**: Redux (`@reduxjs/toolkit`) for SDK requests, notifications, and loading state; Apollo Client (configured in `application-shell-connectors`) for all GraphQL data. Custom apps can inject additional reducers at runtime via `<InjectReducers>`.
- **Feature flags**: Uses `@flopflip` with LaunchDarkly and HTTP adapters (combined adapter pattern). Feature toggle hooks and components are re-exported from `@flopflip/react-broadcast`.
- **Three preconstruct entry points**: `./index.ts` (main shell + re-exports from connectors and flopflip), `./ssr/index.ts` (permission formatters for server-side use), `./test-utils/index.ts` (full-stack test harness wrapping Apollo, Redux, IntlProvider, Router, flopflip, and permissions).
- **Re-exports**: The main entry re-exports `useMcQuery`, `useMcMutation`, and other Apollo hooks from `application-shell-connectors`, plus `entryPointUriPathToPermissionKeys` from `application-config/ssr`, plus all flopflip toggle APIs. Consumers typically import everything from this package rather than from the underlying packages directly.
- **GraphQL files**: Contains `.mc.graphql`, `.settings.graphql`, and `.proxy.graphql` files for shell-internal queries (user, project, navbar, feature flags). Generated types live in `src/types/generated/`.

## How To Work Here

Root workflows apply. Additional notes:

- After modifying any `.graphql` file, run the matching codegen command (e.g. `pnpm generate-types:mc`) to regenerate `src/types/generated/`.
- The `test-utils` entry point (`test-utils/index.ts`) is a published API surface used by all downstream custom applications for testing — treat changes to it as breaking.

## Gotchas

- The Redux store is created as a **module-level singleton** (`configure-store.ts` exports `createReduxStore()` at import time). Tests that need a fresh store must use the `test-utils` render helper, which creates its own instance.
- `ApplicationShellProvider` is the composition root — it wires together Apollo, Redux, Router, IntlProvider, and ApplicationContext. Changes here affect every downstream app.
- The `ssr` entry point runs in Node.js (not browser) — it must not import browser-only code.
