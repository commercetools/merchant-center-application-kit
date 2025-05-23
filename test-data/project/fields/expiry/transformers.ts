import { Transformer } from '@commercetools/composable-commerce-test-data/core';
import type { TProjectExpiry, TProjectExpiryGraphql } from './types';

const transformers = {
  graphql: Transformer<TProjectExpiry, TProjectExpiryGraphql>('graphql', {
    addFields: () => ({
      __typename: 'ProjectExpiry',
    }),
  }),
};

export default transformers;
