---
"@commercetools-frontend/eslint-config-mc-app": patch
"@commercetools-backend/eslint-config-node": patch
---

Remove `jest/no-jest-import` rule from ESLint configs. 

This allows consumers of our configs to update to `eslint-plugin-jest` v27 which removes the rule as a breaking change.
