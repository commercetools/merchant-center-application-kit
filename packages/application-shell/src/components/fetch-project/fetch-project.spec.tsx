import type { TProjectGraphql } from '../../../../../test-data/project';

import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import * as ProjectMock from '../../../../../test-data/project';
import { renderApp, screen, waitForElementToBeRemoved } from '../../test-utils';
import FetchProject from './fetch-project';

jest.mock('@commercetools-frontend/sentry');

const mockServer = setupServer(
  graphql.query('FetchProject', (_req, res, ctx) =>
    res.once(
      ctx.data({
        project: ProjectMock.random()
          .name('Test 1')
          .buildGraphql<TProjectGraphql>(),
      })
    )
  )
);
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

const renderProject = () =>
  renderApp(
    <FetchProject projectKey="test-1">
      {({ isLoading, error, project }) => {
        if (isLoading) return <div>{'loading...'}</div>;
        if (error) return <div>{`Error: ${error.message}`}</div>;
        if (project) return <div>{`Project: ${project.name}`}</div>;
        return null;
      }}
    </FetchProject>
  );

describe('rendering', () => {
  describe('when fetching project succeeds', () => {
    it('should fetch project and pass data to children function', async () => {
      renderProject();

      await waitForElementToBeRemoved(() => screen.getByText('loading...'));

      expect(screen.getByText(/Test 1/i)).toBeInTheDocument();
    });
  });

  describe('when fetching project fails with a graphql error', () => {
    it('should render error state', async () => {
      mockServer.use(
        graphql.query('FetchProject', (_req, res, ctx) =>
          res(ctx.errors([{ message: 'Something went wrong' }]))
        )
      );

      renderProject();

      await waitForElementToBeRemoved(() => screen.getByText('loading...'));

      expect(
        screen.getByText(/Error: Something went wrong(.*)/i)
      ).toBeInTheDocument();
      expect(reportErrorToSentry).toHaveBeenCalled();
    });
  });

  describe('when fetching project fails with a network error', () => {
    it('should render error state', async () => {
      mockServer.use(
        graphql.query('FetchProject', (_req, res, ctx) =>
          res(ctx.status(401), ctx.errors([{ message: 'Unauthorized' }]))
        )
      );

      renderProject();

      await waitForElementToBeRemoved(() => screen.getByText('loading...'));

      expect(
        screen.getByText(/Error: Response not successful(.*)/i)
      ).toBeInTheDocument();
      expect(reportErrorToSentry).toHaveBeenCalled();
    });
  });
});
