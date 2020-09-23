import type { TOrganization, TOrganizationGraphql } from './types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<TOrganization, TOrganizationGraphql>('graphql', {
    addFields: () => ({
      __typename: 'Organization',
    }),
  }),
};

export default transformers;
