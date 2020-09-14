import type { TBuilder } from '@commercetools-test-data/core';

export type TCreateProjectBuilder = (args?: {
  defaults?: Partial<TProject>;
}) => TBuilder<TProject>;

export type TProjectSuspensionGraphql = {
  __typename: 'ProjectSuspension';
  isActive: boolean;
};

export type TProjectExpiryGraphql = {
  __typename: 'ProjectExpiry';
  isActive: boolean;
};

export type TProject = {
  id: string;
  version: string;
  createdAt: string;
  lastModifiedAt: string;
  name: string;
  key: string;
};

export type TProjectGraphql = TProject & {
  __typename: 'Project';
  suspension: TProjectSuspensionGraphql;
  expiry: TProjectExpiryGraphql;
};
