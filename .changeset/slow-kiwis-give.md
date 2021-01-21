---
'@commercetools-frontend/eslint-config-mc-app': major
---

Restructure and simplify ESLint config for MC applications, in particular the rules and list of plugins.
We now base our config to ESLint React App instead of Airbnb.

Also, there is now only `eslint` as a required peer dependency.

> Note that this is primarily to avoid consumers having to install all of the potentially required peer dependencies, as per recommendation from ESLint when publishing sharable configs.
> However, all the dependencies are defined with a caret `^` version range, which gives a bit of flexibility to the consumers in case of version conflicts.

```diff
{
-  "babel-eslint": "10.1.0",
  "eslint": "7.18.0"
-  "eslint-config-airbnb-base": "14.2.1",
-  "eslint-config-prettier": "7.2.0",
-  "eslint-plugin-babel": "5.3.1",
-  "eslint-plugin-import": "2.22.1",
-  "eslint-plugin-jest": "24.1.3",
-  "eslint-plugin-jest-dom": "3.6.5",
-  "eslint-plugin-jsx-a11y": "6.4.1",
-  "eslint-plugin-prefer-object-spread": "1.2.1",
-  "eslint-plugin-prettier": "3.3.1",
-  "eslint-plugin-react": "7.22.0"
}
```
