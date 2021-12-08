---
'merchant-center-application-template-starter': major
'@commercetools-frontend/application-shell': major
'playground': major
---

Following breaking changes were introduced in `test-utils`:

- The deprecated `project.allAppliedMenuVisibilities` option has been removed.
- The `disableApolloMocks` option has been renamed to `useApolloMocks`. The behavior is now inverted. By default, the Apollo mocks are disabled. This is to encourage mocking via [MSW](https://mswjs.io/).
- The `disableAutomaticEntryPointRoutes` option now defaults to `false`. This means that when rendering the `<ApplicationShell>`, you should not use the `render` function but pass the application component using `children`. See [changelog](https://github.com/commercetools/merchant-center-application-kit/blob/main/packages/application-shell/CHANGELOG.md#1790) for more information.
- The deprecated `permissions` option has been removed. Use `project.allAppliedPermissions` instead.

  ```js
  // Before
  {
    permissions: {
      canManageProducts: true;
    }
  }

  // After
  {
    project: {
      allAppliedPermissions: [{ name: 'canManageProducts', value: true }];
    }
  }
  ```

  You can also use the helper function `denormalizePermissions`.

  ```js
  import { denormalizePermissions } from '@commercetools-frontend/application-shell/test-utils';

  {
    project: {
      allAppliedPermissions: denormalizePermissions({
        canManageProducts: true,
      });
    }
  }
  ```

- The deprecated `actionRights` option has been removed. Use `project.allAppliedActionRights` instead.

  ```js
  // Before
  {
    actionRights: {
      products: {
        canEditPrices: true,
        canPublishProducts: false,
      }
    }
  }

  // After
  {
    project: {
      allAppliedActionRights: [
        { group: 'products', name: 'canEditPrices', value: true },
        { group: 'products', name: 'canPublishProducts', value: false }
      ]
    }
  }
  ```

  You can also use the helper function `denormalizeActionRights`.

  ```js
  import { denormalizeActionRights } from '@commercetools-frontend/application-shell/test-utils';

  {
    project: {
      allAppliedActionRights: denormalizeActionRights({
        products: {
          canEditPrices: true,
          canPublishProducts: false,
        },
      });
    }
  }
  ```

- The deprecated `dataFences` option has been removed. Use `project.allAppliedDataFences` instead.

  ```js
  // Before
  {
    dataFences: {
      store: {
        orders: {
          canViewOrders: {
            values: ['store-1'],
          }
        }
      }
    }
  }

  // After
  {
    project: {
      allAppliedDataFences: [
        { type: 'store', group: 'orders', name: 'canViewOrders', value: 'store-1' }
      ]
    }
  }
  ```

  You can also use the helper function `denormalizeDataFences`.

  ```js
  import { denormalizeDataFences } from '@commercetools-frontend/application-shell/test-utils';

  {
    project: {
      allAppliedDataFences: denormalizeDataFences({
        store: {
          orders: {
            canViewOrders: {
              values: ['store-1'],
            },
          },
        },
      });
    }
  }
  ```

For more information see [Release notes v21](https://docs.commercetools.com/custom-applications/releases/2022-01-15-custom-applications-v21).
