---
'@commercetools-applications/merchant-center-custom-view-template-starter-typescript': major
'@commercetools-applications/merchant-center-template-starter-typescript': major
'@commercetools-frontend/application-shell-connectors': major
'@commercetools-frontend/application-components': major
'@commercetools-applications/merchant-center-custom-view-template-starter': major
'@commercetools-frontend/jest-stylelint-runner': major
'@commercetools-applications/merchant-center-template-starter': major
'@commercetools-frontend/react-notifications': major
'@commercetools-frontend/jest-preset-mc-app': major
'@commercetools-frontend/application-shell': major
'@commercetools-frontend/actions-global': major
'@commercetools-frontend/permissions': major
'@commercetools-frontend/constants': major
'@commercetools-local/visual-testing-app': major
'@commercetools-frontend/codemod': major
'@commercetools-frontend/sentry': major
'@commercetools-local/playground': major
---

**Jest 30 upgrade** - [Upgrade guide](https://jestjs.io/docs/upgrading-to-jest30)

- Removed `globals` configuration (NODE_ENV set automatically)
- Removed `crypto.randomUUID` polyfill (JSDOM 26 native support)
- Removed `uuid` dependency
- Updated peer dependency to Jest 30.x
- Breaking changes: deprecated matcher aliases removed, non-enumerable properties excluded from object matchers
- JSDOM upgraded from v21 to v26 with improved spec compliance
