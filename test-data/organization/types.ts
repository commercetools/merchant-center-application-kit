import type { TBuilder } from '@commercetools-test-data/core';

export type TCreateOrganizationBuilder = () => TBuilder<TOrganization>;

export type TOrganization = {
  id: string;
  name: string;
};
export type TOrganizationGraphql = TOrganization & {
  __typename: 'Organization';
};
