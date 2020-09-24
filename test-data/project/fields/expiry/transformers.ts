import type { TProjectExpiry, TProjectExpiryGraphql } from './types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<TProjectExpiry, TProjectExpiryGraphql>('graphql', {
    addFields: () => ({
      __typename: 'ProjectExpiry',
    }),
  }),
};

export default transformers;
