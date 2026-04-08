# Custom View Template Starter (JS)

## Purpose

JavaScript starter template for Merchant Center Custom Views, used both as living documentation and as the source directory that `create-mc-app` copies to scaffold new projects.

## Key Context

- This is a fully functional Custom View -- it includes routes, components, hooks, and i18n.
- `create-mc-app --application-type custom-view` clones this directory verbatim (minus `CHANGELOG.md`) into the user's new project. Every file, config, and directory name matters.
- Dependencies use `workspace:*` protocol in the monorepo, which pnpm's publish pipeline replaces with pinned versions in the published tarball.
- The `custom-view-config.mjs` file configures the view's type (`CustomPanel`), size, locators (where in the MC it appears), and cloud identifier.

## How To Work Here

This template has its own scripts that mirror a standalone app:

```sh
pnpm --filter @commercetools-applications/merchant-center-custom-view-template-starter run start
pnpm --filter @commercetools-applications/merchant-center-custom-view-template-starter run test
pnpm --filter @commercetools-applications/merchant-center-custom-view-template-starter run build
```

The monorepo root also exposes convenience scripts: `pnpm template-custom-view-starter:start`, `pnpm template-custom-view-starter:build`.

## Gotchas

- Every file in this directory becomes part of the scaffolded output. Adding internal-only files (e.g. workspace tooling config, monorepo-specific scripts) will leak into end-user projects.
- The JS starter must stay in sync with `starter-typescript` -- feature changes should be mirrored in both Custom View templates.
- This package is `private: true` and not published to npm directly. It is distributed via `create-mc-app`'s git-clone mechanism.
