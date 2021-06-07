---
"@commercetools-frontend/application-shell": patch
"@commercetools-frontend/jest-preset-mc-app": patch
"merchant-center-application-template-starter": patch
---

Updates to `jest` v27 including `jest-each`, `pretty-format` and `ts-jest`.

The breaking changes of `jest` are encapsulated into `jest-preset-mc-app` while a condition was added to ensure backwards compatibility of `babel-jest` and the export of `createTransformer`.
