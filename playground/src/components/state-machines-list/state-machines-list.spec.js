import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { buildGraphqlList } from '@commercetools-test-data/core';
import {
  screen,
  waitFor,
  fireEvent,
  within,
} from '@commercetools-frontend/application-shell/test-utils';
import { GtmContext } from '@commercetools-frontend/application-shell';
import { entryPointUriPath } from '../../constants';
import { renderApplicationWithRedux } from '../../test-utils';
import * as StateMock from '../../test-utils/test-data/state';
import ApplicationPlaygroundRoutes from '../../routes';

const mockServer = setupServer();
afterEach(() => mockServer.resetHandlers());
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mockServer.close());

const renderApp = (options = {}) => {
  const route = options.route || `/my-project/${entryPointUriPath}`;
  const gtmMock = { track: jest.fn(), getHierarchy: jest.fn() };
  const { history } = renderApplicationWithRedux(
    <GtmContext.Provider value={gtmMock}>
      <ApplicationPlaygroundRoutes />
    </GtmContext.Provider>,
    {
      route,
      environment: {
        entryPointUriPath,
      },
      ...options,
    }
  );
  return { gtmMock, history };
};

const fetchState = () => {
  return graphql.query('FetchState', (req, res, ctx) => {
    const { id } = req.variables;
    return res(
      ctx.data({
        state: StateMock.random().id(id).key(`state-key-${id}`).buildGraphql(),
      })
    );
  });
};

const fetchAllStates = () => {
  return graphql.query('FetchStates', (req, res, ctx) =>
    res(
      ctx.data({
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
      })
    )
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
      const { history, gtmMock } = renderApp({
        route: `/my-project/${entryPointUriPath}/1`,
      });

      const dialog = await screen.findByRole('dialog');
      await within(dialog).findByText(/state-key-1/i);
      await waitFor(() => {
        expect(gtmMock.track).toHaveBeenCalledWith(
          'rendered',
          'State machine details'
        );
      });

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
        graphql.query('FetchState', (req, res, ctx) => {
          return res(
            ctx.errors([
              {
                statusCode: 500,
                message: 'Something went wrong',
              },
            ])
          );
        })
      );
      renderApp({
        route: `/my-project/${entryPointUriPath}/1`,
      });
      await screen.findByText(/Something went wrong/i);
    });
  });
});
