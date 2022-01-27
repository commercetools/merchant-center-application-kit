import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { Route } from 'react-router-dom';
import { UserMock, ProjectMock } from '../../../../../graphql-test-utils';
import { renderApp, screen } from '../../test-utils';
import ProjectSuspended from './project-suspended';

const mockServer = setupServer(
  graphql.query('FetchUserProjects', (req, res, ctx) =>
    res(
      ctx.data({
        user: UserMock.build({
          projects: {
            __typename: 'ProjectQueryResult',
            total: 2,
            results: ProjectMock.buildList(2),
          },
        }),
      })
    )
  )
);
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

describe('rendering', () => {
  it('when suspension is temporary it should print correct message', async () => {
    renderApp(
      <Route
        path="/:projectKey"
        render={() => <ProjectSuspended isTemporary={true} />}
      />,
      {
        disableRoutePermissionCheck: true,
        route: '/my-project',
      }
    );
    await screen.findByText(
      /Your Project is temporarily suspended due to maintenance/
    );
    await screen.findByText('Search for a project');
  });
});
