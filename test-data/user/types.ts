import type { TBuilder } from '@commercetools-test-data/core';
import type { TProject, TProjectGraphql } from '../project';

export type TCreateUserBuilder = () => TBuilder<TUser>;

type TBaseUser = {
  id: string;
  version: string;
  createdAt: string;
  lastModifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  language: string;
  numberFormat: string;
  timeZone?: string;
  gravatarHash: string;
  launchdarklyTrackingId: string;
  launchdarklyTrackingGroup: string;
  launchdarklyTrackingSubgroup: string;
  launchdarklyTrackingTeam: string;
  launchdarklyTrackingTenant: string;
  defaultProjectKey: string;
  businessRole?: string;
};

export type TUser = TBaseUser & {
  projects: {
    __typename: string;
    count: number;
    offset: number;
    total: number;
    results: TProject[];
  };
};

export type TUserGraphql = TBaseUser & {
  __typename: 'User';
  projects: {
    __typename: string;
    count: number;
    offset: number;
    total: number;
    results: TProjectGraphql[];
  };
};
