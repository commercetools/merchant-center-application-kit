import type { TMenuVisibilities } from './types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TMenuVisibilities>({
  name: 'MenuVisibilities',
  fields: {
    hideDashboard: fake(() => true),
    // ...
  },
});

export default generator;
