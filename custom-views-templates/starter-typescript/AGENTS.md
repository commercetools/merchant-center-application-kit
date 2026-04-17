# Custom View Template Starter (TypeScript)

See root `AGENTS.md` for monorepo-wide context.

## Purpose

TypeScript starter template for Merchant Center Custom Views, used both as living documentation and as the source directory that `create-mc-app` copies to scaffold new projects.

## Key Context

- This is a fully functional Custom View -- it includes routes, components, hooks, i18n, type definitions, and config files.
- `create-mc-app --application-type custom-view` clones this directory verbatim (minus `CHANGELOG.md`) into the user's new project. Every file, config, and directory name matters.
- Dependencies use `workspace:*` protocol in the monorepo, which pnpm's publish pipeline replaces with pinned versions in the published tarball.
- Has additional directories not in the JS starter: `@types/`, `@types-extensions/`, `schemas/`, and a `tsconfig.json`.
- Typechecked from the monorepo root via `pnpm typecheck:starter:custom-views`.

## How To Work Here

This template has its own scripts that mirror a standalone app:

```sh
pnpm --filter @commercetools-applications/merchant-center-custom-view-template-starter-typescript run start
pnpm --filter @commercetools-applications/merchant-center-custom-view-template-starter-typescript run test
pnpm --filter @commercetools-applications/merchant-center-custom-view-template-starter-typescript run build
pnpm --filter @commercetools-applications/merchant-center-custom-view-template-starter-typescript run typecheck
```

The monorepo root also exposes convenience scripts: `pnpm template-custom-view-starter-typescript:start`, `pnpm template-custom-view-starter-typescript:build`.

## Gotchas

- Every file in this directory becomes part of the scaffolded output. Adding internal-only files (e.g. workspace tooling config, monorepo-specific scripts) will leak into end-user projects.
- The TypeScript starter must stay in sync with `starter` (JS) -- feature changes should be mirrored in both Custom View templates.
- This package is `private: true` and not published to npm directly. It is distributed via `create-mc-app`'s git-clone mechanism.
