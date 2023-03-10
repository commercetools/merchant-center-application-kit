import { fake, Generator } from '@commercetools-test-data/core';
import type { TPermissions } from './types';

const generator = Generator<TPermissions>({
  fields: {
    canViewProducts: fake(() => true),
    // ...
  },
});

export default generator;
