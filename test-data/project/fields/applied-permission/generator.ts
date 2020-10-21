import type { TPermissions } from './types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TPermissions>({
  fields: {
    canViewProducts: fake(() => true),
    // ...
  },
});

export default generator;
