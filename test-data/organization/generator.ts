import type { TOrganization } from './types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TOrganization>({
  name: 'User',
  fields: {
    id: fake((f) => f.random.uuid()),
    name: fake((f) => f.company.companyName()),
  },
});

export default generator;
