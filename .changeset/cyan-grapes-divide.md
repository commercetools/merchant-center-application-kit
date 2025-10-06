---
'@commercetools-applications/merchant-center-custom-view-template-starter-typescript': patch
'@commercetools-applications/merchant-center-template-starter-typescript': patch
'@commercetools-applications/merchant-center-custom-view-template-starter': patch
'@commercetools-applications/merchant-center-template-starter': patch
---

Migrate from deprecated `eslint-plugin-graphql` to `@graphql-eslint/eslint-plugin` for graphql@16 compatibility. This change provides functional parity with the previous linting behavior while supporting modern GraphQL tooling.

**For consumers using graphql@16:** This change enables compatibility with graphql@16 and resolves peer dependency conflicts. The new plugin provides equivalent validation of GraphQL queries against schemas.

**Migration not required:** Existing consumer projects can continue using their current ESLint configuration. Migration is only needed if encountering graphql peer dependency conflicts (e.g., when adopting Redux 5.x or graphql@16 for other reasons).
