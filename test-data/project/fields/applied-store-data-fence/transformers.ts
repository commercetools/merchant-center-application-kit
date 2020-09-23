import type {
  TAppliedStoreDataFence,
  TAppliedStoreDataFenceGraphql,
} from '../../types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<TAppliedStoreDataFence, TAppliedStoreDataFenceGraphql>(
    'graphql',
    {
      addFields: () => ({
        __typename: 'StoreDataFence',
      }),
    }
  ),
};

export default transformers;
