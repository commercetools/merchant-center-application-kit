---
'merchant-center-application-template-starter-typescript': minor
'@commercetools-frontend/create-mc-app': minor
'merchant-center-application-template-starter': patch
---

Adds a new Custom Application starter template in TypeScript including the bare minimum configuration setup:

- `tsconfig.json` extended from `@commercetools-frontend/tsconfig`
- `prettier` config
- `jest` config
- linters adjustments to include TS file extensions `ts, tsx`
- custom @types declarations
- missing type declarations for JS-only modules
- graphql generated types

The template can be installed using the `npx` command. Replace `<folder_name>` with the name of the folder where the template should be installed into.

```bash
$ npx @commercetools-frontend/create-mc-app <folder_name> --template starter-typescript
```
