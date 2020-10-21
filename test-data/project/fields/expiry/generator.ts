import type { TProjectExpiry } from './types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TProjectExpiry>({
  fields: {
    isActive: fake(() => false),
    daysLeft: null,
  },
});

export default generator;
