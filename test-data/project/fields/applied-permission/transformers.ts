import type {
  TAppliedPermission,
  TAppliedPermissionGraphql,
} from '../../types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<TAppliedPermission, TAppliedPermissionGraphql>(
    'graphql',
    {
      addFields: () => ({
        __typename: 'AppliedPermission',
      }),
    }
  ),
};

export default transformers;
