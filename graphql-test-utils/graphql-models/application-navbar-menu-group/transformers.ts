import { Transformer } from '@commercetools-test-data/core';
import type { TNavbarMenuGroup, TNavbarMenuGroupGraphql } from './types';

const transformers = {
  default: Transformer<TNavbarMenuGroup, TNavbarMenuGroup>('default', {}),
  graphql: Transformer<TNavbarMenuGroup, TNavbarMenuGroupGraphql>('graphql', {
    addFields: () => ({
      __typename: 'NavbarMenuGroup',
    }),
  }),
};

export default transformers;
