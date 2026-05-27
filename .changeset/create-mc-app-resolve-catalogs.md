---
'@commercetools-frontend/create-mc-app': patch
---

Support `workspace:^` and `catalog:` specifiers when scaffolding —
previously the CLI only handled `workspace:*`, so apps generated from
the latest templates failed to install.

Scaffolded `package.json` files now pin internal
`@commercetools-frontend/*` deps with caret ranges (`^x.y.z`) instead
of exact versions. Application Kit packages release in lockstep, so a
caret range always resolves to a synchronized set of latest patches —
the lockstep invariant is preserved, and subsequent
`npm install` / `yarn install` / `pnpm install` runs pick up
patch/minor updates automatically.

`npx create-mc-app …` continues to work against any template version,
old or new.
