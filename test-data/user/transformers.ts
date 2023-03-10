import {
  Transformer,
  toGraphqlPaginatedQueryResult,
} from '@commercetools-test-data/core';
import * as ProjectMock from '../project';
import type { TUser, TUserGraphql } from './types';

const transformers = {
  graphql: Transformer<TUser, TUserGraphql>('graphql', {
    replaceFields: ({ fields }) => {
      const project =
        ProjectMock.random().buildGraphql<ProjectMock.TProjectGraphql>();
      const projectsPaginatedResults = toGraphqlPaginatedQueryResult(
        [project],
        {
          name: 'Project',
          total: 1,
        }
      );
      return {
        ...fields,
        __typename: 'User',
        projects: {
          ...projectsPaginatedResults,
          __typename: 'ProjectQueryResult',
        },
      };
    },
  }),
};

export default transformers;
