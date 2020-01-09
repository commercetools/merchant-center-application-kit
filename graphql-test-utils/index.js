import * as mocksForMc from './graphql-mocks/mc';
import * as mocksForProxy from './graphql-mocks/proxy';

export { default as createGraphqlMockServer } from './create-graphql-mock-server';
export { default as UserMock } from './graphql-models/user';
export { default as ProjectMock } from './graphql-models/project';
export { mocksForMc, mocksForProxy };
