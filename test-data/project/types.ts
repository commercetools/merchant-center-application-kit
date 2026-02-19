import type { TBuilder } from '@commercetools/composable-commerce-test-data/core';
import { TProductCatalogModel } from '../../packages/application-shell/src/types/generated/mc';
import type { TOrganization, TOrganizationGraphql } from '../organization';
import type {
  TActionRights,
  TAppliedActionRightsGraphql,
} from './fields/applied-action-right';
import type {
  TPermissions,
  TAppliedPermissionGraphql,
} from './fields/applied-permission';
import type {
  TStoreDataFences,
  TAppliedStoreDataFencesGraphql,
} from './fields/applied-store-data-fence';
import type { TProjectExpiry, TProjectExpiryGraphql } from './fields/expiry';
import type {
  TProjectSuspension,
  TProjectSuspensionGraphql,
} from './fields/suspension';

export type TCreateProjectBuilder = () => TBuilder<TProject>;

type TBaseProject = {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  name: string;
  key: string;
  countries: string[];
  currencies: string[];
  languages: string[];
  initialized: boolean;
  isProductionProject: boolean;
  sampleDataImportDataset?: string;
  isUserAdminOfCurrentProject: boolean;
  productCatalogModel: TProductCatalogModel;
};

export type TProject = TBaseProject & {
  owner: TOrganization;
  suspension: TProjectSuspension;
  expiry: TProjectExpiry;
  permissions: TPermissions;
  actionRights: TActionRights;
  dataFences: TStoreDataFences;
};

export type TProjectGraphql = TBaseProject & {
  __typename: 'Project';
  owner: TOrganizationGraphql;
  suspension: TProjectSuspensionGraphql;
  expiry: TProjectExpiryGraphql;
  allAppliedPermissions: TAppliedPermissionGraphql;
  allAppliedActionRights: TAppliedActionRightsGraphql;
  allAppliedDataFences: TAppliedStoreDataFencesGraphql;
  allPermissionsForAllApplications: {
    allAppliedPermissions: TAppliedPermissionGraphql;
    allAppliedActionRights: TAppliedActionRightsGraphql;
    allAppliedDataFences: TAppliedStoreDataFencesGraphql;
    allAppliedMenuVisibilities?: Array<{
      name: string;
      value: boolean;
    }>;
  };
  isProductionProject: boolean;
};
