import ProjectExtensionMock from '../graphql-models/project-extension';

const createMockOperations = (customOperations = {}) => ({
  FetchProjectExtensionsNavbar: {
    projectExtension: ProjectExtensionMock.build(),
  },
  ...customOperations,
});

const createMockResolvers = () => ({});

export { createMockOperations, createMockResolvers };
