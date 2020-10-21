import type { TMenuVisibilities } from './types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TMenuVisibilities>({
  fields: {
    hideDashboard: fake(() => true),
    // ...
  },
});

export default generator;
