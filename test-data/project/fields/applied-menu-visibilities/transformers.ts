import type {
  TMenuVisibilities,
  TAppliedMenuVisibilitiesGraphql,
} from './types';

import { Transformer } from '@commercetools-test-data/core';

const upperFirst = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const transformers = {
  graphql: Transformer<TMenuVisibilities, TAppliedMenuVisibilitiesGraphql>(
    'graphql',
    {
      replaceFields: ({ fields }) =>
        Object.entries(fields).map(([key, value]) => ({
          __typename: 'AppliedMenuVisibilities',
          name: upperFirst(key),
          value,
        })),
    }
  ),
};

export default transformers;
