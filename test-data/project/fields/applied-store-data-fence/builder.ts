import type { TAppliedStoreDataFence } from '../../types';
import type { TBuilder } from '@commercetools-test-data/core';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const AppliedStoreDataFence = (): TBuilder<TAppliedStoreDataFence> =>
  Builder<TAppliedStoreDataFence>({
    generator,
    transformers,
  });

export default AppliedStoreDataFence;
