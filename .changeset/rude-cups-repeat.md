---
'@commercetools-frontend/jest-preset-mc-app': patch
---

Add proper entry point for Jest preset for `typescript`.

```diff
-const jestPresetForTypeScript = require('@commercetools-frontend/jest-preset-mc-app/jest-preset-for-typescript');

module.exports = {
-  ...jestPresetForTypeScript,
+  preset: '@commercetools-frontend/jest-preset-mc-app/typescript'
};
```

The import `@commercetools-frontend/jest-preset-mc-app/jest-preset-for-typescript` still works for backwards compatibility.
