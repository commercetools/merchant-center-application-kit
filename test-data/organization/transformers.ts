import { Transformer } from '@commercetools/composable-commerce-test-data/core';
import type { TOrganization, TOrganizationGraphql } from './types';

const transformers = {
  graphql: Transformer<TOrganization, TOrganizationGraphql>('graphql', {
    addFields: () => ({
      __typename: 'Organization',
    }),
  }),
};

export default transformers;
