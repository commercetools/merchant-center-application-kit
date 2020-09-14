import type { TBuilder } from '@commercetools-test-data/core';
import type { TProjectGraphql } from '../project';

export type TCreateUserBuilder = (args?: {
  defaults?: Partial<TUser>;
}) => TBuilder<TUser>;

export type TUser = {
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
};

export type TUserGraphql = TUser & {
  __typename: 'User';
  gravatarHash: string;
  launchdarklyTrackingId: string;
  launchdarklyTrackingGroup: string;
  launchdarklyTrackingSubgroup: string;
  launchdarklyTrackingTeam: string;
  launchdarklyTrackingTenant: string;
  defaultProjectKey: string;
  projects: {
    __typename: string;
    count: number;
    offset: number;
    total: number;
    results: TProjectGraphql[];
  };
};
