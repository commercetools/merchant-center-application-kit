import type { TUser, TUserGraphql } from './types';

import {
  Transformer,
  toGraphqlPaginatedQueryResult,
} from '@commercetools-test-data/core';
import * as Project from '../project';

const transformers = {
  graphql: Transformer<TUser, TUserGraphql>('graphql', {
    addFields: () => {
      const project = Project.random().buildGraphql<Project.TProjectGraphql>();
      return {
        __typename: 'User',
        gravatarHash: '',
        launchdarklyTrackingId: '',
        launchdarklyTrackingGroup: '',
        launchdarklyTrackingSubgroup: '',
        launchdarklyTrackingTeam: '',
        launchdarklyTrackingTenant: '',
        defaultProjectKey: project.key,
        projects: toGraphqlPaginatedQueryResult([project], {
          name: 'Project',
          total: 1,
        }),
      };
    },
  }),
};

export default transformers;
