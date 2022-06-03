---
'@commercetools-frontend/application-config': minor
---

Expose a base `tsconfig-mc-app.json` file to be used in a Custom Application TypeScript project.

In your `tsconfig.json` file, extend the base config from the `@commercetools-frontend/application-config` package:

```json
{
  "extends": "@commercetools-frontend/application-config/tsconfig-mc-app.json"
}
```
