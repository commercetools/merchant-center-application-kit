import React from 'react';
import { Route } from 'react-router-dom';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { renderApp } from '../../test-utils';
import UserQuery from '../fetch-user/fetch-user.mc.graphql';
import ProjectsQuery from '../project-switcher/project-switcher.mc.graphql';
import ProjectSuspended from './project-suspended';

describe('rendering', () => {
  it('when suspension is temporary it should print correct message', async () => {
    const rendered = renderApp(
      <Route
        path="/:projectKey"
        render={() => <ProjectSuspended isTemporary={true} />}
      />,
      {
        route: '/my-project',
        addTypename: true,
        mocks: [
          {
            request: {
              query: UserQuery,
              variables: { target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND },
            },
            result: {
              data: {
                user: {
                  __typename: 'User',
                  id: 'user-id',
                  email: 'user-email',
                  gravatarHash: 'user-gravatarHash',
                  firstName: 'John',
                  lastName: 'Snow',
                  language: 'en',
                  numberFormat: 'en-US',
                  timeZone: null,
                  launchdarklyTrackingId: 'ld-1',
                  launchdarklyTrackingGroup: 'commercetools',
                  launchdarklyTrackingSubgroup: 'dev',
                  launchdarklyTrackingTeam: 'ld-team-1',
                  launchdarklyTrackingTenant: 'eu',
                  defaultProjectKey: 'project-key',
                  projects: {
                    __typename: 'ProjectQueryResult',
                    total: 1,
                    results: [
                      {
                        __typename: 'Project',
                        key: 'key-1',
                        name: 'name-1',
                        suspension: {
                          __typename: 'ProjectSuspension',
                          isActive: true,
                        },
                        expiry: {
                          __typename: 'ProjectExpiry',
                          isActive: false,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
          {
            request: {
              query: ProjectsQuery,
              variables: { target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND },
            },
            result: {
              data: {
                user: {
                  __typename: 'User',
                  id: 'user-id',
                  projects: {
                    __typename: 'ProjectQueryResult',
                    results: [
                      {
                        __typename: 'Project',
                        key: 'key-1',
                        name: 'name-1',
                        suspension: {
                          __typename: 'ProjectSuspension',
                          isActive: true,
                        },
                        expiry: {
                          __typename: 'ProjectExpiry',
                          isActive: false,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
      }
    );
    await rendered.findByText(
      /Your Project is temporarily suspended due to maintenance/
    );
  });
});
