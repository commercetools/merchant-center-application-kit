import React from 'react';
import { Route } from 'react-router-dom';
import { renderApp, wait as waitFor } from '../../test-utils';
import { createGraphqlResponseForProjectsQuery } from '../project-switcher/project-switcher-test-utils';
import ServicePageProjectSwitcher from './service-page-project-switcher';

describe('rendering', () => {
  describe('when user has access to no projects', () => {
    it('should render nothing', async () => {
      const rendered = renderApp(
        <Route path={`/:projectKey`} component={ServicePageProjectSwitcher} />,
        {
          route: '/test-1',
          user: {
            projects: {
              total: 0,
              results: [],
            },
          },
        }
      );
      await waitFor(() => {
        expect(
          rendered.container.querySelector('[name="project-switcher"]')
        ).not.toBeInTheDocument();
      });
    });
  });
  describe('when user has access to some projects', () => {
    it('should render dropdown', async () => {
      const mockedRequest = [
        createGraphqlResponseForProjectsQuery({
          numberOfProjects: 1,
        }),
      ];
      const rendered = renderApp(
        <Route path={`/:projectKey`} component={ServicePageProjectSwitcher} />,
        {
          route: '/test-1',
          user: {
            projects: {
              total: 1,
              results: [
                {
                  key: 'key-1',
                },
              ],
            },
          },
          addTypename: true,
          mocks: mockedRequest,
        }
      );
      await waitFor(() =>
        expect(
          rendered.container.querySelector('[name="project-switcher"]')
        ).toBeInTheDocument()
      );
    });
  });
});
