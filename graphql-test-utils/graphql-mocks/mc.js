import UserMock from '../graphql-models/user';
import ProjectMock from '../graphql-models/project';

const createMockOperations = (customOperations = {}) => {
  const defaultProject =
    customOperations.FetchProject && customOperations.FetchProject.project
      ? customOperations.FetchProject.project
      : ProjectMock.build();

  const operations = {
    FetchLoggedInUser: {
      me: UserMock.build({
        defaultProjectKey: defaultProject.key,
        projects: {
          __typename: 'ProjectQueryResult',
          total: 2,
          results: [defaultProject, ProjectMock.build()],
        },
      }),
    },
    FetchProject: {
      project: defaultProject,
    },
    FetchUserProjects: {
      me: UserMock.build({
        defaultProjectKey: defaultProject.key,
        projects: {
          __typename: 'ProjectQueryResult',
          total: 2,
          results: [defaultProject, ProjectMock.build()],
        },
      }),
    },
    ...customOperations,
  };

  return operations;
};

const createMockResolvers = () => ({});

export { createMockOperations, createMockResolvers };
