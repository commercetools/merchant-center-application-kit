---
'@commercetools-frontend/create-mc-app': patch
---

Fix scaffolding from templates that use pnpm catalogs or the
`workspace:^` protocol. Previously the CLI only flattened the exact
`workspace:*` specifier, so apps generated from the latest templates
would end up with unresolved `workspace:^` or `catalog:` entries in
their `package.json` and fail to install.

The CLI now resolves these to concrete versions automatically. No
changes are needed in your usage — `npx create-mc-app …` keeps working
the same way against any template version, old or new.
