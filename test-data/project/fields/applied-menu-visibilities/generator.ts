import type { TAppliedMenuVisibilities } from '../../types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TAppliedMenuVisibilities>({
  name: 'AppliedMenuVisibilities',
  fields: {
    name: 'hideDashboard',
    value: fake(() => true),
  },
});

export default generator;
