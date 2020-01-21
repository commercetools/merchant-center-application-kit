import ApplicationAppbarMenuMock from '../graphql-models/application-appbar-menu';
import ApplicationNavbarMenuMock from '../graphql-models/application-navbar-menu';

const createMockOperations = (customOperations = {}) => ({
  FetchAllMenuFeatureToggles: {
    allFeatureToggles: [],
  },
  FetchApplicationsMenu: {
    applicationsMenu: {
      apppBar: ApplicationAppbarMenuMock.buildList(1),
      navBar: ApplicationNavbarMenuMock.buildList(1),
    },
  },
  ...customOperations,
});

const createMockResolvers = () => ({});

export { createMockOperations, createMockResolvers };
