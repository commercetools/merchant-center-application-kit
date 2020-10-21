import type { TActionRights } from './types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TActionRights>({
  fields: {
    products: {
      canEditPrices: fake(() => true),
    },
    // ...
  },
});

export default generator;
