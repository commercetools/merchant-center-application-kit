---
'@commercetools-frontend/eslint-config-mc-app': major
---

Restructure and simplify ESLint config for MC applications, in particular the rules and list of plugins.
We now base our config to ESLint React App instead of Airbnb.

Also, there is now only `eslint` as a required peer dependency.

> Note that this is primarily to avoid consumers having to install all of the potentially required peer dependencies, as per recommendation from ESLint when publishing sharable configs.
> However, all the dependencies are defined with a caret `^` version range, which gives a bit of flexibility to the consumers in case of version conflicts.
