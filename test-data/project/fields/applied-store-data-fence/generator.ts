import type { TAppliedStoreDataFence } from '../../types';

import { Generator } from '@commercetools-test-data/core';

const generator = Generator<TAppliedStoreDataFence>({
  name: 'AppliedMenuVisibilities',
  fields: {
    value: 'usa',
    type: 'store',
    group: 'orders',
    name: 'canManageOrders',
  },
});

export default generator;
