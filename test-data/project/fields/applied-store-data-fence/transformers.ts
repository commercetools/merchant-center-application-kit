import type { TStoreDataFences, TAppliedStoreDataFencesGraphql } from './types';

import { Transformer } from '@commercetools-test-data/core';

const upperFirst = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const transformers = {
  graphql: Transformer<TStoreDataFences, TAppliedStoreDataFencesGraphql>(
    'graphql',
    {
      replaceFields: ({ fields }) =>
        Object.entries(fields).reduce(
          (allAppliedStoreDataFences, [type, groupByResource]) => [
            ...allAppliedStoreDataFences,
            ...Object.entries(groupByResource).reduce(
              (allGroupsByResource, [group, dataFence]) => [
                ...allGroupsByResource,
                ...Object.entries(dataFence).map(([canKey, value]) => ({
                  __typename: 'StoreDataFence',
                  name: upperFirst(canKey.replace('can', '')),
                  value,
                  group,
                  type,
                })),
              ],
              []
            ),
          ],
          []
        ),
    }
  ),
};

export default transformers;
