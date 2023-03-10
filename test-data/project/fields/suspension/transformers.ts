import { Transformer } from '@commercetools-test-data/core';
import type { TProjectSuspension, TProjectSuspensionGraphql } from './types';

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
