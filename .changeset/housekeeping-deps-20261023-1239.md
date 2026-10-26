---
'@commercetools-backend/express': patch
'@commercetools-backend/loggers': patch
'@commercetools-frontend/actions-global': patch
'@commercetools-frontend/application-components': patch
'@commercetools-frontend/application-config': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/application-shell-connectors': patch
'@commercetools-frontend/create-mc-app': patch
'@commercetools-frontend/cypress': patch
'@commercetools-frontend/i18n': patch
'@commercetools-frontend/jest-preset-mc-app': patch
'@commercetools-frontend/l10n': patch
'@commercetools-frontend/mc-html-template': patch
'@commercetools-frontend/mc-scripts': patch
'@commercetools-frontend/notifications': patch
'@commercetools-frontend/permissions': patch
'@commercetools-frontend/react-notifications': patch
'@commercetools-frontend/sdk': patch
'@commercetools-frontend/sentry': patch
'@commercetools-frontend/url-utils': patch
---

Update dependencies to the latest minor and patch versions.

Runtime dependencies with a new pinned version:

- `@commercetools/nimbus` 3.5.1 → 3.8.0
- `@flopflip/*` 15.1.12 → 15.1.14
- `@pmmmwh/react-refresh-webpack-plugin` 0.6.2 → 0.6.3
- `@radix-ui/react-dialog` 1.1.23 → 1.3.1
- `@reduxjs/toolkit` 2.12.0 → 2.13.0
- `@rollup/pluginutils` 5.4.0 → 5.5.1
- `babel-jest` 30.4.1 → 30.5.2
- `babel-preset-jest` 30.4.0 → 30.5.0
- `fs-extra` 11.4.0 → 11.4.1
- `jest-environment-jsdom` 30.4.1 → 30.5.2
- `jest-mock` 30.4.1 → 30.5.2
- `postcss` 8.5.26 → 8.5.31
- `reselect` 5.2.0 → 5.3.0
- `serialize-javascript` 7.1.0 → 7.1.2
- `uuid` 14.0.1 → 14.0.3
- `webpack` 5.109.2 → 5.112.0
- `webpack-dev-server` 5.2.6 → 5.2.7

The browser data (`caniuse-lite`, `browserslist`) used by the build is refreshed, so the compiled output of the packages can use more modern syntax for the same browserslist queries.
