import type {
  TAppliedMenuVisibilities,
  TAppliedMenuVisibilitiesGraphql,
} from '../../types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<
    TAppliedMenuVisibilities,
    TAppliedMenuVisibilitiesGraphql
  >('graphql', {
    addFields: () => ({
      __typename: 'AppliedMenuVisibilities',
    }),
  }),
};

export default transformers;
