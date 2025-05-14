---
'@commercetools-applications/merchant-center-custom-view-template-starter-typescript': minor
'@commercetools-applications/merchant-center-template-starter-typescript': minor
'@commercetools-applications/merchant-center-custom-view-template-starter': minor
'@commercetools-applications/merchant-center-template-starter': minor
'@commercetools-frontend/mc-scripts': minor
'@commercetools-local/playground': minor
---

Updates to the starter templates: migrate test data packages `@commercetools-test-data/*` to new standalone package `@commercetools/composable-commerce-test-data`.

The packages `@commercetools-test-data/*` are considered deprecated and won't be published anymore.
We now have a single package `@commercetools/composable-commerce-test-data` that contains all the test data models.

The package is configured to be consumed using named entry points to be compatible with the previous individual packages and to help keeping the bundle size for consumers to a minimum.

For example:

```ts
// Before
import { ChannelGraphql } from '@commercetools-test-data/channel';

// After
import { ChannelGraphql } from '@commercetools/composable-commerce-test-data/channel';
```

To facilitate the migration, we provide a codemod script [transform-imports.mjs](https://github.com/commercetools/test-data/blob/main/scripts/transform-imports.mjs) to be executed in your repository that you need to migrate.

You can use the following command:

```
curl -sSL https://raw.githubusercontent.com/commercetools/test-data/main/scripts/transform-imports.mjs | node -
```

Alternatively, copy the script content and create a new script file in your repository. Then execute the script with `node`.
See JSDoc inside the script for more information.
