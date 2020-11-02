import type { TBuilder } from '@commercetools-test-data/core';
import type { TOrganization, TOrganizationGraphql } from '../organization';
import type { TProjectExpiry, TProjectExpiryGraphql } from './fields/expiry';
import type {
  TProjectSuspension,
  TProjectSuspensionGraphql,
} from './fields/suspension';
import type {
  TPermissions,
  TAppliedPermissionGraphql,
} from './fields/applied-permission';
import type {
  TActionRights,
  TAppliedActionRightsGraphql,
} from './fields/applied-action-right';
import type {
  TMenuVisibilities,
  TAppliedMenuVisibilitiesGraphql,
} from './fields/applied-menu-visibilities';
import type {
  TStoreDataFences,
  TAppliedStoreDataFencesGraphql,
} from './fields/applied-store-data-fence';

export type TCreateProjectBuilder = () => TBuilder<TProject>;

type TBaseProject = {
  id: string;
  version: string;
  createdAt: string;
  lastModifiedAt: string;
  name: string;
  key: string;
  countries: string[];
  currencies: string[];
  languages: string[];
  initialized: boolean;
};

export type TProject = TBaseProject & {
  owner: TOrganization;
  suspension: TProjectSuspension;
  expiry: TProjectExpiry;
  permissions: TPermissions;
  actionRights: TActionRights;
  menuVisibilities: TMenuVisibilities;
  dataFences: TStoreDataFences;
};

export type TProjectGraphql = TBaseProject & {
  __typename: 'Project';
  owner: TOrganizationGraphql;
  suspension: TProjectSuspensionGraphql;
  expiry: TProjectExpiryGraphql;
  allAppliedPermissions: TAppliedPermissionGraphql;
  allAppliedActionRights: TAppliedActionRightsGraphql;
  allAppliedMenuVisibilities: TAppliedMenuVisibilitiesGraphql;
  allAppliedDataFences: TAppliedStoreDataFencesGraphql;
};
