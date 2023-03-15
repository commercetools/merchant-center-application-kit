import { Route } from 'react-router-dom';
import { renderApp, waitFor } from '../../test-utils';
import { createGraphqlResponseForProjectsQuery } from '../project-switcher/project-switcher-test-utils';
import ServicePageProjectSwitcher from './service-page-project-switcher';

describe('rendering', () => {
  describe('when user has access to no projects', () => {
    it('should render nothing', async () => {
      const { container } = renderApp(
        <Route path={`/:projectKey`}>
          <ServicePageProjectSwitcher />
        </Route>,
        {
          disableRoutePermissionCheck: true,
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
          // eslint-disable-next-line testing-library/no-container
          container.querySelector('[name="project-switcher"]')
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
      const { container } = renderApp(
        <Route path={`/:projectKey`}>
          <ServicePageProjectSwitcher />
        </Route>,
        {
          disableRoutePermissionCheck: true,
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
          mocks: mockedRequest,
        }
      );
      // eslint-disable-next-line testing-library/prefer-find-by
      await waitFor(() =>
        expect(
          // eslint-disable-next-line testing-library/no-container
          container.querySelector('[name="project-switcher"]')
        ).toBeInTheDocument()
      );
    });
  });
});
