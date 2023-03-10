import { fake, Generator } from '@commercetools-test-data/core';
import type { TActionRights } from './types';

const generator = Generator<TActionRights>({
  fields: {
    products: {
      canEditPrices: fake(() => true),
    },
    // ...
  },
});

export default generator;
