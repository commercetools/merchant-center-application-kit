import type { TOrganization } from './types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TOrganization>({
  fields: {
    id: fake((f) => f.datatype.uuid()),
    name: fake((f) => f.company.name()),
  },
});

export default generator;
