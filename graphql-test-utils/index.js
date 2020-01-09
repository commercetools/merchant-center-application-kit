import * as mocksForMc from './mc';
import * as mocksForProxy from './proxy';

export { default as createGraphqlMockServer } from './create-graphql-mock-server';
export { default as UserMock } from './graphql-mocks/user';
export { default as ProjectMock } from './graphql-mocks/project';
export { mocksForMc, mocksForProxy };
