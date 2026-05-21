---
'@commercetools-frontend/create-mc-app': patch
---

Resolve `workspace:^` and `catalog:` / `catalog:<name>` specifiers when
scaffolding from a template. Previously `update-package-json` only
flattened the exact string `workspace:*` — templates that have since
moved to `workspace:^` or to pnpm catalogs would leak those specifiers
into the scaffolded app and break installation.

The CLI now reads the cloned repo's `pnpm-workspace.yaml` to resolve
each catalog reference to a concrete version, and rewrites
`workspace:^` to `^<releaseVersion>` (matching what pnpm rewrites at
publish time). Older template tags that predate catalog adoption are
still supported — if no `pnpm-workspace.yaml` is present in the clone,
the legacy `workspace:*` rewrite path runs alone.
