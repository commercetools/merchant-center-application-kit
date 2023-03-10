import { Transformer } from '@commercetools-test-data/core';
import type { TStoreDataFences, TAppliedStoreDataFencesGraphql } from './types';

const upperFirst = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const transformers = {
  graphql: Transformer<TStoreDataFences, TAppliedStoreDataFencesGraphql>(
    'graphql',
    {
      replaceFields: ({ fields }) =>
        Object.entries(fields).reduce<TAppliedStoreDataFencesGraphql>(
          (allAppliedStoreDataFences, [type, groupByResource]) => {
            if (!groupByResource) return allAppliedStoreDataFences;
            const transformedStoreDataFenceGroup: TAppliedStoreDataFencesGraphql =
              Object.entries(
                groupByResource
              ).reduce<TAppliedStoreDataFencesGraphql>(
                (allGroupsByResource, [group, dataFence]) => {
                  if (!dataFence) return allGroupsByResource;
                  const transformedStoreDataFence: TAppliedStoreDataFencesGraphql =
                    Object.entries(
                      dataFence
                    ).reduce<TAppliedStoreDataFencesGraphql>(
                      (allValuesDataFences, [canKey, value]) => {
                        const transformedStoreDataFenceValues: TAppliedStoreDataFencesGraphql =
                          (value?.values ?? []).map((value) => ({
                            __typename: 'StoreDataFence',
                            name: upperFirst(canKey.replace('can', '')),
                            value,
                            group,
                            type,
                          }));
                        return [
                          ...allValuesDataFences,
                          ...transformedStoreDataFenceValues,
                        ];
                      },
                      []
                    );
                  return [...allGroupsByResource, ...transformedStoreDataFence];
                },
                []
              );
            return [
              ...allAppliedStoreDataFences,
              ...transformedStoreDataFenceGroup,
            ];
          },
          []
        ),
    }
  ),
};

export default transformers;
