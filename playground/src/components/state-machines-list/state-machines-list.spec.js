import { HttpResponse, graphql } from 'msw';
import { buildGraphqlList } from '@commercetools-test-data/core';
import { setupServer } from 'msw/node';
import {
  screen,
  waitFor,
  fireEvent,
  within,
} from '@commercetools-frontend/application-shell/test-utils';
import { entryPointUriPath } from '../../constants';
import ApplicationPlaygroundRoutes from '../../routes';
import { renderApplicationWithRedux } from '../../test-utils';
import * as StateMock from '../../test-utils/test-data/state';

const mockServer = setupServer(
  graphql.query('FetchCustomViewsByLocator', () => {
    return HttpResponse.json({
      data: {
        allCustomViewsInstallationsByLocator: [],
      }
    })
  })
);
afterEach(() => mockServer.resetHandlers());
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mockServer.close());

const renderApp = (options = {}) => {
  const route = options.route || `/my-project/${entryPointUriPath}`;
  const { history } = renderApplicationWithRedux(
    <ApplicationPlaygroundRoutes />,
    {
      route,
      environment: {
        entryPointUriPath,
      },
      ...options,
    }
  );
  return { history };
};

const fetchState = () => {
  return graphql.query('FetchState', ({ variables }) =>
    HttpResponse.json({
      data: {
        state: StateMock.random().id(variables.id).key(`state-key-${variables.id}`).buildGraphql(),
      }
    })
  );
};

const fetchAllStates = () => {
  return graphql.query('FetchStatesRest', () =>
    HttpResponse.json({
      data: {
        states: buildGraphqlList(
          [
            StateMock.random().key('state-key-1').id('1'),
            StateMock.random().key('state-key-2').id('2'),
            StateMock.random().key('state-key-3').id('3'),
          ],
          {
            name: 'State',
            total: 3,
          }
        ),
      },
    })
  );
};

describe('list view', () => {
  it('the user can see a list of state machines', async () => {
    mockServer.use(fetchAllStates());
    renderApp();
    await screen.findByText(/State machines/i);
    await screen.findByText('state-key-1');
    await screen.findByText('state-key-2');
    expect(screen.queryByText('state-key-22')).not.toBeInTheDocument();
  });

  it('the user can click on the state machines to get to the details page', async () => {
    mockServer.use(fetchAllStates(), fetchState());
    const { history } = renderApp();
    await screen.findByText('state-key-1');
    fireEvent.click(screen.getByText('state-key-1'));
    await waitFor(() => {
      expect(history.location.pathname).toBe(
        `/my-project/${entryPointUriPath}/1`
      );
    });

    const dialog = await screen.findByRole('dialog');
    await within(dialog).findByText(/state-key-1/i);
  });
});

describe('details view', () => {
  describe('when request is successful', () => {
    it('should render data on page', async () => {
      mockServer.use(fetchAllStates(), fetchState());
      renderApp({
        route: `/my-project/${entryPointUriPath}/2`,
      });

      const dialog = await screen.findByRole('dialog');
      await within(dialog).findByText(/state-key-2/i);
    });
    it('should retrigger request if id changes', async () => {
      mockServer.use(fetchAllStates(), fetchState());
      const { history } = renderApp({
        route: `/my-project/${entryPointUriPath}/1`,
      });

      const dialog = await screen.findByRole('dialog');
      await within(dialog).findByText(/state-key-1/i);

      history.push(`/my-project/${entryPointUriPath}/2`);
      await within(dialog).findByText(/state-key-2/i);
    });
  });

  describe('when request returns an error', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });
    it('should render notification error message', async () => {
      mockServer.use(
        fetchAllStates(),
        graphql.query('FetchState', () => {
          return HttpResponse.json({
            errors: [
              {
                statusCode: 500,
                message: 'Something went wrong',
              },
            ]
          });
        }),
      );
      renderApp({
        route: `/my-project/${entryPointUriPath}/1`,
      });
      await screen.findByText(/Something went wrong/i);
    });
  });
});
