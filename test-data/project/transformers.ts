import type { TProject, TProjectGraphql } from './types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<TProject, TProjectGraphql>('graphql', {
    buildFields: ['suspension', 'expiry', 'owner'],
    addFields: () => ({
      __typename: 'Project',
    }),
  }),
};

export default transformers;
