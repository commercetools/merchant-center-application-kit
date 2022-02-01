---
'@commercetools-frontend/jest-stylelint-runner': major
'@commercetools-frontend/mc-scripts': major
---

Upgrade Stylelint and PostCSS dependencies.

The peer dependency min version for `stylelint` is now `14`. If your project has a Stylelint config file, we recommend to follow the [Migrating to 14.0.0 guide](https://github.com/stylelint/stylelint/blob/main/docs/migration-guide/to-14.md).

> Note that the syntax support for CSS-in-JS languages has been removed from Stylelint and therefore is not available by default in the `jest-stylelint-runner`.

Moreover, the `postcss-color-mod-function` dependency has been removed, as the `color-mod()` function is [not part of the CSS Color spec](https://github.com/w3c/csswg-drafts/commit/034b063697c3dadf144504f52e0858a79cd84414) anymore. If you were relying on this function you need to find another solution.
