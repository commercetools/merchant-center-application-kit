import type { TProjectSuspension, TProjectSuspensionGraphql } from './types';

import { Transformer } from '@commercetools-test-data/core';

const transformers = {
  graphql: Transformer<TProjectSuspension, TProjectSuspensionGraphql>(
    'graphql',
    {
      addFields: () => ({
        __typename: 'ProjectSuspension',
      }),
    }
  ),
};

export default transformers;
