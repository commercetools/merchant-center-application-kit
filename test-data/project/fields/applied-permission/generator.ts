import type { TAppliedPermission } from '../../types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TAppliedPermission>({
  name: 'AppliedPermission',
  fields: {
    name: 'ViewProducts',
    value: fake(() => true),
  },
});

export default generator;
