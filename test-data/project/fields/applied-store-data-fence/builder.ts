import type { TBuilder } from '@commercetools-test-data/core';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TStoreDataFences } from './types';

const AppliedStoreDataFence = (): TBuilder<TStoreDataFences> =>
  Builder<TStoreDataFences>({
    generator,
    transformers,
  });

export default AppliedStoreDataFence;
