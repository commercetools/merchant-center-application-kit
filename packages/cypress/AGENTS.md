# cypress

See root `AGENTS.md` for monorepo-wide context.

## Purpose

Cypress custom commands and task helpers for end-to-end testing of Custom Applications and Custom Views, consumed by downstream projects as `@commercetools-frontend/cypress`.

## Key Context

- Three preconstruct entrypoints:
  - **`index`** -- exports the package `version` and shared constants (storage keys, OIDC response types).
  - **`add-commands`** -- registers Cypress commands (`cy.loginToMerchantCenter`, `cy.loginToMerchantCenterForCustomView`, `cy.loginByOidc`, `cy.hover`, `cy.showNavigationSubmenuItems`, `cy.getIframeBody`). Imported in a consumer's Cypress support file.
  - **`task`** -- exports `customApplicationConfig` and `customViewConfig` Cypress tasks that load and resolve `application-config` for use during test setup. Registered via `cy.task()` in the consumer's `setupNodeEvents`.
- The login commands handle multiple auth flows (Identity-based and legacy MC login) for both localhost and production environments, using `cy.session` for caching.
- Contains a vendored `realHover` implementation (ported from `cypress-real-events`) to avoid TypeScript type clashes between Cypress and Jest globals.
- `src/version.ts` exports a placeholder string that is replaced at build time with the actual package version.

## How To Work Here

Follow the root workflow. No unit tests exist in this package. Changes to login commands should be tested manually against a real Custom Application Cypress suite.

## Gotchas

- The `task/index.ts` module uses `@manypkg/get-packages` to discover all workspace packages and load their application configs. It caches the result -- if you are debugging config resolution, be aware of the in-memory cache (`cachedAllCustomEntityConfigs`).
- `cypress` is a `peerDependency` (>=8), not a direct dependency. The `devDependencies` pin is only for type-checking within this repo.
