---
'@commercetools-frontend/create-mc-app': patch
---

Fix scaffolding from templates that use pnpm catalogs or the
`workspace:^` protocol. Previously the CLI only flattened the exact
`workspace:*` specifier, so apps generated from the latest templates
would end up with unresolved `workspace:^` or `catalog:` entries in
their `package.json` and fail to install.

Internal `@commercetools-frontend/*` references in the latest templates
are now declared as `workspace:^` (caret) instead of `workspace:*`
(exact), and the CLI resolves them to `^x.y.z` in the scaffolded
`package.json`. As a result, your installation will automatically pick
up compatible patch and minor updates of the Application Kit packages
on subsequent `npm install` / `yarn install` / `pnpm install` runs —
no manual bumps required.

No changes are needed in your usage — `npx create-mc-app …` keeps
working the same way against any template version, old or new.
