import { graphql, rest } from 'msw';
import { setupServer } from 'msw/node';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import type { TProjectGraphql } from '../../../../../test-data/project';
import * as ProjectMock from '../../../../../test-data/project';
import { renderApp, screen, waitForElementToBeRemoved } from '../../test-utils';
import FetchProject from './fetch-project';

declare let window: ApplicationWindow;

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
    </FetchProject>,
    {
      disableRoutePermissionCheck: true,
    }
  );

describe('rendering', () => {
  describe('when fetching project succeeds', () => {
    it('should fetch project and pass data to children function', async () => {
      renderProject();

      await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

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

      await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

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

      await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

      expect(
        screen.getByText(/Error: Response not successful(.*)/i)
      ).toBeInTheDocument();
      expect(reportErrorToSentry).toHaveBeenCalled();
    });
  });
});

describe('with a project prefetched by the proxy', () => {
  // A unique application identifier per test, so that each test has its own
  // preload URL (each URL is only used once).
  let testCount = 0;
  let applicationIdentifier: string;
  let originalApplicationIdentifier: string | undefined;

  beforeEach(() => {
    testCount += 1;
    applicationIdentifier = `__internal:test-app-${testCount}`;
    originalApplicationIdentifier = window.app.applicationIdentifier;
    window.app.applicationIdentifier = applicationIdentifier;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.setAttribute('as', 'fetch');
    link.setAttribute('crossorigin', 'use-credentials');
    link.href = `/__prefetch/project?projectKey=test-1&applicationId=${encodeURIComponent(
      applicationIdentifier
    )}`;
    document.head.appendChild(link);
  });
  afterEach(() => {
    window.app.applicationIdentifier = originalApplicationIdentifier!;
    window.sessionStorage.removeItem('activeTeamId');
    document.head.innerHTML = '';
  });

  it('should use the prefetched project without sending the query', async () => {
    const queryHandler = jest.fn((_req, res, ctx) =>
      res(
        ctx.data({
          project: ProjectMock.random()
            .key('test-1')
            .name('Network')
            .buildGraphql<TProjectGraphql>(),
        })
      )
    );
    mockServer.use(
      rest.get('*/__prefetch/project', (_req, res, ctx) =>
        res(
          ctx.json({
            data: {
              project: ProjectMock.random()
                .key('test-1')
                .name('Prefetched')
                .buildGraphql<TProjectGraphql>(),
            },
          })
        )
      ),
      graphql.query('FetchProject', queryHandler)
    );

    renderProject();

    await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

    expect(screen.getByText(/Prefetched/i)).toBeInTheDocument();
    expect(queryHandler).not.toHaveBeenCalled();
  });

  it('should not use the prefetched project with an active team', async () => {
    window.sessionStorage.setItem('activeTeamId', 'team-1');
    const prefetchHandler = jest.fn((_req, res, ctx) =>
      res(
        ctx.json({
          data: {
            project: ProjectMock.random()
              .key('test-1')
              .name('Prefetched')
              .buildGraphql<TProjectGraphql>(),
          },
        })
      )
    );
    mockServer.use(
      rest.get('*/__prefetch/project', prefetchHandler),
      graphql.query('FetchProject', (_req, res, ctx) =>
        res(
          ctx.data({
            project: ProjectMock.random()
              .key('test-1')
              .name('Network')
              .buildGraphql<TProjectGraphql>(),
          })
        )
      )
    );

    renderProject();

    await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

    expect(screen.getByText(/Network/i)).toBeInTheDocument();
    expect(prefetchHandler).not.toHaveBeenCalled();
  });

  it('should fall back to the query if the prefetch fails', async () => {
    mockServer.use(
      rest.get('*/__prefetch/project', (_req, res, ctx) =>
        res(ctx.status(504))
      ),
      graphql.query('FetchProject', (_req, res, ctx) =>
        res(
          ctx.data({
            project: ProjectMock.random()
              .key('test-1')
              .name('Network')
              .buildGraphql<TProjectGraphql>(),
          })
        )
      )
    );

    renderProject();

    await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

    expect(screen.getByText(/Network/i)).toBeInTheDocument();
  });
});
