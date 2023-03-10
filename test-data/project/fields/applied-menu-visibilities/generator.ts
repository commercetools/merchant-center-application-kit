import { fake, Generator } from '@commercetools-test-data/core';
import type { TMenuVisibilities } from './types';

const generator = Generator<TMenuVisibilities>({
  fields: {
    hideDashboard: fake(() => true),
    // ...
  },
});

export default generator;
