import { Transformer } from '@commercetools-test-data/core';
import type { TNavbarMenuGroup, TNavbarMenuGroupGraphql } from './types';

const transformers = {
  default: Transformer<TNavbarMenuGroup, TNavbarMenuGroup>('default', {
    // buildFields: ['items'],
  }),
  graphql: Transformer<TNavbarMenuGroup, TNavbarMenuGroupGraphql>('graphql', {
    // buildFields: ['items'],
    addFields: () => ({
      __typename: 'NavbarMenuGroup',
    }),
  }),
};

export default transformers;
