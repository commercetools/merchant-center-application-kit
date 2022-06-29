---
'@commercetools-frontend/application-config': minor
---

Provide better support for developing Custom Applications in TypeScript.

A shared TSConfig file is now available to be used as a base config in your `tsconfig.json` file:

```json
{
  "extends": "@commercetools-frontend/application-config/tsconfig-mc-app.json"
}
```

Furthermore, we provide a `client.d.ts` declaration file with some basic type shims for importing media assets:

- `.mod.css` and `.module.css`
- `.png`
- `.svg`

You can include this using the TypeScript triple-slash directives:

```ts
/// <reference types="@commercetools-frontend/application-config/client" />
```

> By default, this is included in the TypeScript starter template `src/index.tsx` entry point file.

You can also include this in the `tsconfig.json` file in the `compilerOptions.types` field but we don't recommend
to use that unless you are very familiar with the [implications of using the `types` field](https://www.typescriptlang.org/tsconfig#types).
