import { Transformer } from '@commercetools-test-data/core';
import type { TPermissions, TAppliedPermissionGraphql } from './types';

const upperFirst = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

const transformers = {
  graphql: Transformer<TPermissions, TAppliedPermissionGraphql>('graphql', {
    replaceFields: ({ fields }) =>
      Object.entries(fields).map(([canKey, value]) => ({
        __typename: 'AppliedPermission',
        name: upperFirst(canKey.replace('can', '')),
        value,
      })),
  }),
};

export default transformers;
