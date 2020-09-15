import type { TBuilder } from '@commercetools-test-data/core';

export type TCreateProjectBuilder = (args?: {
  defaults?: Partial<TProject>;
}) => TBuilder<TProject>;

export type TProjectSuspensionGraphql = {
  __typename: 'ProjectSuspension';
  isActive: boolean;
  reason?: string;
};

export type TProjectExpiryGraphql = {
  __typename: 'ProjectExpiry';
  isActive: boolean;
  daysLeft?: number;
};

export type TAppliedPermissionGraphql = {
  __typename: 'AppliedPermission';
  name: string;
  value: boolean;
};

export type TAppliedActionRightGraphql = {
  __typename: 'AppliedActionRight';
  name: string;
  value: boolean;
  group: string;
};

export type TAppliedMenuVisibilitiesGraphql = {
  __typename: 'AppliedMenuVisibilities';
  name: string;
  value: boolean;
};

export type TAppliedStoreDataFenceGraphql = {
  __typename: 'StoreDataFence';
  name: string;
  value: string;
  group: string;
  type: string;
};

export type TProject = {
  id: string;
  version: string;
  createdAt: string;
  lastModifiedAt: string;
  name: string;
  key: string;
  owner: TProjectOwner;
  countries: string[];
  currencies: string[];
  languages: string[];
};

// TODO: move to `Organization`
export type TProjectOwner = {
  id: string;
  name: string;
};
export type TProjectOwnerGraphql = {
  __typename: 'Organization';
  id: string;
  name: string;
};

export type TProjectGraphql = TProject & {
  __typename: 'Project';
  initialized: boolean;
  suspension: TProjectSuspensionGraphql;
  expiry: TProjectExpiryGraphql;
  allAppliedPermissions: TAppliedPermissionGraphql[];
  allAppliedActionRights: TAppliedActionRightGraphql[];
  allAppliedMenuVisibilities: TAppliedMenuVisibilitiesGraphql[];
  allAppliedDataFences: TAppliedStoreDataFenceGraphql[];
  owner: TProjectOwnerGraphql;
};
