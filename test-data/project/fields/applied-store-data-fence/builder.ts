import type { TStoreDataFences } from './types';
import type { TBuilder } from '@commercetools-test-data/core';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedStoreDataFence = (): TBuilder<TStoreDataFences> =>
  Builder<TStoreDataFences>({
    generator,
    transformers,
  });

export default AppliedStoreDataFence;
