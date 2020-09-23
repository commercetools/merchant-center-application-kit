import type {
  TAppliedActionRight,
  TAppliedActionRightGraphql,
} from '../../types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<TAppliedActionRight, TAppliedActionRightGraphql>(
    'graphql',
    {
      addFields: () => ({
        __typename: 'AppliedActionRight',
      }),
    }
  ),
};

export default transformers;
