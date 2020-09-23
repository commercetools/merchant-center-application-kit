import type { TUser, TUserGraphql } from './types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<TUser, TUserGraphql>('graphql', {
    addFields: () => ({ __typename: 'User' }),
  }),
};

export default transformers;
