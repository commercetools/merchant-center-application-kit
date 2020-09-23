import type { TActionRights, TAppliedActionRightsGraphql } from './types';

import { Transformer } from '@commercetools-test-data/core';

const upperFirst = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const transformers = {
  graphql: Transformer<TActionRights, TAppliedActionRightsGraphql>('graphql', {
    replaceFields: ({ fields }) =>
      Object.entries(fields).reduce(
        (allAppliedActionRights, [group, actionRight]) => [
          ...allAppliedActionRights,
          ...Object.entries(actionRight).map(([canKey, value]) => ({
            __typename: 'AppliedActionRight',
            name: upperFirst(canKey.replace('can', '')),
            value,
            group,
          })),
        ],
        []
      ),
  }),
};

export default transformers;
