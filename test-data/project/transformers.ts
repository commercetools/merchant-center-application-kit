import type {
  TProject,
  TProjectGraphql,
  TProjectSuspensionGraphql,
  TProjectExpiryGraphql,
  TProjectOwnerGraphql,
} from './types';

import {
  fake,
  Builder,
  Generator,
  Transformer,
  buildField,
} from '@commercetools-test-data/core';

const generatorProjectSuspension = Generator<TProjectSuspensionGraphql>({
  name: 'ProjectSuspension',
  fields: {
    __typename: 'ProjectSuspension',
    isActive: fake(() => false),
    reason: null,
  },
});
const generatorProjectExpiry = Generator<TProjectExpiryGraphql>({
  name: 'ProjectExpiry',
  fields: {
    __typename: 'ProjectExpiry',
    isActive: fake(() => false),
    daysLeft: null,
  },
});
const generatorOrganization = Generator<TProjectOwnerGraphql>({
  name: 'Organization',
  fields: {
    __typename: 'Organization',
    id: fake((f) => f.random.uuid()),
    name: fake((f) => f.company.companyName()),
  },
});

const transformers = {
  graphql: Transformer<TProject, TProjectGraphql>('graphql', {
    addFields: () => ({
      __typename: 'Project',
      initialized: true,
      suspension: buildField(
        Builder({ generator: generatorProjectSuspension })
      ),
      expiry: buildField(Builder({ generator: generatorProjectExpiry })),
      // Default values should be defined as presets
      allAppliedPermissions: [],
      allAppliedActionRights: [],
      allAppliedMenuVisibilities: [],
      allAppliedDataFences: [],
    }),
    replaceFields: () => ({
      owner: buildField(Builder({ generator: generatorOrganization })),
    }),
  }),
};

export default transformers;
