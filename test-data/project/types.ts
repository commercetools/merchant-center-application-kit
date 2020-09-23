import type { TBuilder } from '@commercetools-test-data/core';
import type { TOrganization, TOrganizationGraphql } from '../organization';

export type TCreateProjectBuilder = (args?: {
  defaults?: Partial<TProject>;
}) => TBuilder<TProject>;

export type TProjectSuspension = {
  isActive: boolean;
  reason?: string;
};
export type TProjectSuspensionGraphql = TProjectSuspension & {
  __typename: 'ProjectSuspension';
};

export type TProjectExpiry = {
  isActive: boolean;
  daysLeft?: number;
};
export type TProjectExpiryGraphql = TProjectExpiry & {
  __typename: 'ProjectExpiry';
};

export type TAppliedPermission = {
  name: string;
  value: boolean;
};
export type TAppliedPermissionGraphql = TAppliedPermission & {
  __typename: 'AppliedPermission';
};

export type TAppliedActionRight = {
  name: string;
  value: boolean;
  group: string;
};
export type TAppliedActionRightGraphql = TAppliedActionRight & {
  __typename: 'AppliedActionRight';
};

export type TAppliedMenuVisibilities = {
  name: string;
  value: boolean;
};
export type TAppliedMenuVisibilitiesGraphql = TAppliedMenuVisibilities & {
  __typename: 'AppliedMenuVisibilities';
};

export type TAppliedStoreDataFence = {
  name: string;
  value: string;
  group: string;
  type: string;
};
export type TAppliedStoreDataFenceGraphql = TAppliedStoreDataFence & {
  __typename: 'StoreDataFence';
};

export type TProject = {
  id: string;
  version: string;
  createdAt: string;
  lastModifiedAt: string;
  name: string;
  key: string;
  owner: TOrganization;
  countries: string[];
  currencies: string[];
  languages: string[];
  initialized: boolean;
  suspension: TProjectSuspension;
  expiry: TProjectExpiry;
  allAppliedPermissions: TAppliedPermission[];
  allAppliedActionRights: TAppliedActionRight[];
  allAppliedMenuVisibilities: TAppliedMenuVisibilities[];
  allAppliedDataFences: TAppliedStoreDataFence[];
};

export type TProjectGraphql = TProject & {
  __typename: 'Project';
  suspension: TProjectSuspensionGraphql;
  expiry: TProjectExpiryGraphql;
  allAppliedPermissions: TAppliedPermissionGraphql[];
  allAppliedActionRights: TAppliedActionRightGraphql[];
  allAppliedMenuVisibilities: TAppliedMenuVisibilitiesGraphql[];
  allAppliedDataFences: TAppliedStoreDataFenceGraphql[];
  owner: TOrganizationGraphql;
};
