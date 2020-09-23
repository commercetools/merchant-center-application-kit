import type { TCreateUserBuilder, TUser } from './types';

import {
  Builder,
  toGraphqlPaginatedQueryResult,
} from '@commercetools-test-data/core';
import * as ProjectMock from '../project';
import generator from './generator';
import transformers from './transformers';

const User: TCreateUserBuilder = ({ defaults } = {}) => {
  const project = ProjectMock.random().buildGraphql<
    ProjectMock.TProjectGraphql
  >();
  const projectsPaginatedResults = toGraphqlPaginatedQueryResult([project], {
    name: 'Project',
    total: 1,
  });
  return Builder<TUser>({
    generator,
    transformers,
    defaults,
  }).projects(projectsPaginatedResults);
};

export default User;
