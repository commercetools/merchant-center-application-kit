import type { TProject, TProjectGraphql } from './types';

import { Transformer } from '@commercetools-test-data/core';
import * as AppliedPermissionMock from './fields/applied-permission';
import * as AppliedActionRightMock from './fields/applied-action-right';
import * as AppliedMenuVisibilitiesMock from './fields/applied-menu-visibilities';
import * as AppliedStoreDataFenceMock from './fields/applied-store-data-fence';

const transformers = {
  default: Transformer<TProject, TProjectGraphql>('default', {
    buildFields: [
      'suspension',
      'expiry',
      'owner',
      'permissions',
      'actionRights',
      'menuVisibilities',
      'dataFences',
    ],
  }),
  graphql: Transformer<TProject, TProjectGraphql>('graphql', {
    buildFields: [
      'suspension',
      'expiry',
      'owner',
      'permissions',
      'actionRights',
      'menuVisibilities',
      'dataFences',
    ],
    addFields: () => ({
      __typename: 'Project',
      allAppliedPermissions: AppliedPermissionMock.random().buildGraphql<AppliedPermissionMock.TAppliedPermissionGraphql>(),
      allAppliedActionRights: AppliedActionRightMock.random().buildGraphql<AppliedActionRightMock.TAppliedActionRightsGraphql>(),
      allAppliedMenuVisibilities: AppliedMenuVisibilitiesMock.random().buildGraphql<AppliedMenuVisibilitiesMock.TAppliedMenuVisibilitiesGraphql>(),
      allAppliedDataFences: AppliedStoreDataFenceMock.random().buildGraphql<AppliedStoreDataFenceMock.TAppliedStoreDataFencesGraphql>(),
    }),
    removeFields: [
      'permissions',
      'actionRights',
      'menuVisibilities',
      'dataFences',
    ],
  }),
};

export default transformers;
