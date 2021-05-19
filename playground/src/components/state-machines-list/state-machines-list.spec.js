import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import {
  screen,
  renderAppWithRedux,
  waitFor,
  fireEvent,
} from '@commercetools-frontend/application-shell/test-utils';
import { GtmContext } from '@commercetools-frontend/application-shell';
import { ApplicationStateMachines } from '../entry-point';

const createStateMachinesListSdkMock = () => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'GET',
      service: 'states',
      options: {
        perPage: 25,
        page: 1,
      },
      mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  },
  response: {
    count: 25,
    offset: 0,
    total: 2,
    results: [
      { id: 'sm1', key: 'sm-1' },
      { id: 'sm2', key: 'sm-2', name: { en: 'SM 2' } },
    ],
  },
});
const createStateMachinesDetailSdkMockForId1 = () => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'GET',
      service: 'states',
      options: { id: 'sm1' },
      mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  },
  response: {
    id: 'sm1',
    key: 'sm-1',
    type: 'LineItemState',
    initial: true,
    builtIn: true,
  },
});
const createStateMachinesDetailSdkMockForId2 = () => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'GET',
      service: 'states',
      options: { id: 'sm2' },
      mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  },
  response: {
    id: 'sm2',
    key: 'sm-2',
    type: 'LineItemState',
    initial: true,
    builtIn: true,
  },
});
const createStateMachinesDetailSdkErrorMock = () => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'GET',
      service: 'states',
      options: { id: 'sm1' },
      mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  },
  error: {
    statusCode: 500,
    message: 'Something went wrong',
  },
});

const renderApp = (options = {}) => {
  const route = options.route || '/my-project/playground-state-machines';
  const gtmMock = { track: jest.fn(), getHierarchy: jest.fn() };
  const { history } = renderAppWithRedux(
    <GtmContext.Provider value={gtmMock}>
      <ApplicationStateMachines />
    </GtmContext.Provider>,
    {
      route,
      permissions: {
        canViewPlaygroundStateMachines: true,
        canManagePlaygroundStateMachines: true,
      },
      ...options,
    }
  );
  return { gtmMock, history };
};

describe('list view', () => {
  it('the user can see a list of state machines', async () => {
    renderApp({
      sdkMocks: [createStateMachinesListSdkMock()],
    });
    await screen.findByText(/State machines/i);
    await screen.findByText(/There are 2 objects in the cache/i);
    await screen.findByText('sm-1');
    await screen.findByText('sm-2');
  });
  it('the user can click on the state machines to get to the details page', async () => {
    const { history } = renderApp({
      sdkMocks: [
        createStateMachinesListSdkMock(),
        createStateMachinesDetailSdkMockForId1(),
      ],
    });
    await screen.findByText(/There are 2 objects in the cache/i);
    fireEvent.click(screen.getByText('sm-1'));
    await waitFor(() => {
      expect(history.location.pathname).toBe(
        '/my-project/playground-state-machines/sm1'
      );
    });
    await screen.findByText(/sm-1/i);
  });
});

describe('details view', () => {
  describe('when request is successful', () => {
    it('should render data on page', async () => {
      renderApp({
        route: '/my-project/playground-state-machines/sm1',
        sdkMocks: [createStateMachinesDetailSdkMockForId1()],
      });
      await screen.findByText(/sm-1/i);
    });
    it('should retrigger request if id changes', async () => {
      const { history, gtmMock } = renderApp({
        route: '/my-project/playground-state-machines/sm1',
        sdkMocks: [
          createStateMachinesDetailSdkMockForId1(),
          createStateMachinesDetailSdkMockForId2(),
        ],
      });
      await screen.findByText(/sm-1/i);
      await waitFor(() => {
        expect(gtmMock.track).toHaveBeenCalledWith(
          'rendered',
          'State machine details'
        );
      });

      history.push('/my-project/playground-state-machines/sm2');
      await screen.findByText(/sm-2/i);
    });
  });
  describe('when request returns an error', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });
    it('should render notification error message', async () => {
      renderApp({
        route: '/my-project/playground-state-machines/sm1',
        sdkMocks: [createStateMachinesDetailSdkErrorMock()],
      });
      await screen.findByText(/^Sorry, but there seems to be something wrong/i);
    });
  });
});
