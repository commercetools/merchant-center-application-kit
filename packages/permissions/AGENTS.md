# @commercetools-frontend/permissions

See root `AGENTS.md` for monorepo-wide context.

## Purpose

React components and hooks for declaratively checking Merchant Center user permissions, action rights, and data fences, consumed by Custom Applications to gate UI based on authorization.

## Key Context

- Reads the user's actual permissions, action rights, and data fences from `@commercetools-frontend/application-shell-connectors` via `useApplicationContext`. This means the application shell must be mounted as an ancestor provider.
- Permission matching uses a "Manage implies View" convention: if a user has `canManageProducts`, they implicitly have `canViewProducts`. The `toManageCase` / `getIsViewPermission` logic implements this inference.
- Data fences (store-scoped permissions) are an advanced authorization layer that restricts access to specific resource values. They interact with regular permissions: a top-level Manage permission overrides a data fence for the same group.
- Reports authorization errors to Sentry via `@commercetools-frontend/sentry`.

## How To Work Here

Follows root workflows. Test with `pnpm --filter @commercetools-frontend/permissions run test`.

## Gotchas

- The `useIsAuthorized` hook emits development warnings when multiple demanded permissions or action rights are passed at once. The preferred pattern is to use the hook/component multiple times with a single permission each.
- Permission names must match the API format without the `can` prefix (e.g., pass `ViewProducts`, not `canViewProducts`). The `toCanCase` utility adds the prefix internally.
