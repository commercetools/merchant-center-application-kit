import type { TProjectSuspension } from '../../types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TProjectSuspension>({
  name: 'ProjectSuspension',
  fields: {
    isActive: fake(() => false),
    reason: null,
  },
});

export default generator;
