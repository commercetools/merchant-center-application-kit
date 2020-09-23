import type { TAppliedActionRight } from '../../types';

import { fake, Generator } from '@commercetools-test-data/core';

const generator = Generator<TAppliedActionRight>({
  name: 'AppliedActionRight',
  fields: {
    name: 'PublishProducts',
    group: 'products',
    value: fake(() => true),
  },
});

export default generator;
