import { fake, Generator } from '@commercetools-test-data/core';
import type { TOrganization } from './types';

const generator = Generator<TOrganization>({
  fields: {
    id: fake((f) => f.string.uuid()),
    name: fake((f) => f.company.name()),
  },
});

export default generator;
