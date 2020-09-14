import type {
  TProject,
  TProjectGraphql,
  TProjectSuspensionGraphql,
  TProjectExpiryGraphql,
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
  },
});
const generatorProjectExpiry = Generator<TProjectExpiryGraphql>({
  name: 'ProjectExpiry',
  fields: {
    __typename: 'ProjectExpiry',
    isActive: fake(() => false),
  },
});

const transformers = {
  graphql: Transformer<TProject, TProjectGraphql>('graphql', {
    addFields: () => ({
      __typename: 'Project',
      suspension: buildField(
        Builder({ generator: generatorProjectSuspension })
      ),
      expiry: buildField(Builder({ generator: generatorProjectExpiry })),
    }),
  }),
};

export default transformers;
