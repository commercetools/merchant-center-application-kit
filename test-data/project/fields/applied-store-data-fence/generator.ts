import { Generator } from '@commercetools/composable-commerce-test-data/core';
import type { TStoreDataFences } from './types';

const generator = Generator<TStoreDataFences>({
  fields: {
    store: {
      orders: {
        canManageOrders: {
          values: ['usa', 'germany'],
        },
        canViewOrders: {
          values: ['canada'],
        },
      },
      // ...
    },
  },
});

export default generator;
