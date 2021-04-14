import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import {
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
  const rendered = renderAppWithRedux(
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
  return { ...rendered, gtmMock };
};

describe('list view', () => {
  let rendered;
  it('the user can see a list of state machines', async () => {
    rendered = renderApp({
      sdkMocks: [createStateMachinesListSdkMock()],
    });
    await rendered.findByText(/State machines/i);
    await rendered.findByText(/There are 2 objects in the cache/i);
    await rendered.findByText('sm-1');
    await rendered.findByText('sm-2');
  });
  it('the user can click on the state machines to get to the details page', async () => {
    rendered = renderApp({
      sdkMocks: [
        createStateMachinesListSdkMock(),
        createStateMachinesDetailSdkMockForId1(),
      ],
    });
    await rendered.findByText(/There are 2 objects in the cache/i);
    fireEvent.click(rendered.getByText('sm-1'));
    await waitFor(() => {
      expect(rendered.history.location.pathname).toBe(
        '/my-project/playground-state-machines/sm1'
      );
    });
    await rendered.findByText(/sm-1/i);
  });
});

describe('details view', () => {
  let rendered;
  describe('when request is successful', () => {
    it('should render data on page', async () => {
      rendered = renderApp({
        route: '/my-project/playground-state-machines/sm1',
        sdkMocks: [createStateMachinesDetailSdkMockForId1()],
      });
      await rendered.findByText(/sm-1/i);
    });
    it('should retrigger request if id changes', async () => {
      rendered = renderApp({
        route: '/my-project/playground-state-machines/sm1',
        sdkMocks: [
          createStateMachinesDetailSdkMockForId1(),
          createStateMachinesDetailSdkMockForId2(),
        ],
      });
      await rendered.findByText(/sm-1/i);
      await waitFor(() => {
        expect(rendered.gtmMock.track).toHaveBeenCalledWith(
          'rendered',
          'State machine details'
        );
      });

      rendered.history.push('/my-project/playground-state-machines/sm2');
      await rendered.findByText(/sm-2/i);
    });
  });
  describe('when request returns an error', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });
    it('should render notification error message', async () => {
      rendered = renderApp({
        route: '/my-project/playground-state-machines/sm1',
        sdkMocks: [createStateMachinesDetailSdkErrorMock()],
      });
      await rendered.findByText(
        /^Sorry, but there seems to be something wrong/i
      );
    });
  });
});
