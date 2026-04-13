---
'@commercetools-applications/merchant-center-custom-view-template-starter-typescript': minor
'@commercetools-applications/merchant-center-template-starter-typescript': minor
'@commercetools-backend/eslint-config-node': minor
'@commercetools-applications/merchant-center-custom-view-template-starter': minor
'@commercetools-applications/merchant-center-template-starter': minor
'@commercetools-frontend/eslint-config-mc-app': minor
---

-Remove `jest-runner-eslint` from starter templates to fix `npm install` failures caused by its stale `eslint@^7 || ^8` peer dependency declaration, which hard-fails under npm's strict resolution when ESLint 9 is present.
-The `lint` script now calls `eslint .` directly.
-Migration guides updated with recommended steps and a workaround for projects that prefer to keep `jest-runner-eslint`.
