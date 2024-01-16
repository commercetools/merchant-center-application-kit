import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import ProjectsQuery from './project-switcher.mc.graphql';

type CreateGraphqlResponseForProjectsQueryOptions = {
  numberOfProjects?: number;
  getIsSuspended?: (key: string) => boolean;
  getIsExpired?: (key: string) => boolean;
};

const falsy = () => false;

export const createGraphqlResponseForProjectsQuery = ({
  numberOfProjects = 4,
  getIsSuspended = falsy,
  getIsExpired = falsy,
}: CreateGraphqlResponseForProjectsQueryOptions = {}) => ({
  request: {
    query: ProjectsQuery,
    context: { target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND },
  },
  result: {
    data: {
      loading: false,
      user: {
        __typename: 'User',
        id: 'user-id',
        projects: {
          __typename: 'ProjectQueryResult',
          total: numberOfProjects,
          results: Array.from({ length: numberOfProjects }).map((_, index) => {
            const key = `key-${index}`;
            const name = `Name ${index}`;
            return {
              __typename: 'Project',
              key,
              name,
              suspension: {
                __typename: 'ProjectSuspension',
                isActive: getIsSuspended(key),
              },
              expiry: {
                __typename: 'ProjectExpiry',
                isActive: getIsExpired(key),
              },
              isProductionProject: false,
            };
          }),
        },
      },
    },
  },
});
