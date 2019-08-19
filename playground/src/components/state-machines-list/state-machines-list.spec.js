import React from 'react';
import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import {
  renderAppWithRedux,
  waitForElement,
  wait,
  fireEvent,
} from '@commercetools-frontend/application-shell/test-utils';
import { applyUiKitMocks } from '../../mocks';
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
  const route = options.route || '/my-project/state-machines';
  return renderAppWithRedux(<ApplicationStateMachines />, {
    route,
    ...options,
  });
};

describe('list view', () => {
  let rendered;
  beforeAll(() => {
    applyUiKitMocks();
  });
  it('the user can see a list of state machines', async () => {
    rendered = renderApp({
      sdkMocks: [createStateMachinesListSdkMock()],
      permissions: {
        canViewDeveloperSettings: true,
        canManageDeveloperSettings: true,
      },
    });
    await waitForElement(() => rendered.getByText(/State machines/i));
    await waitForElement(() =>
      rendered.getByText(/There are 2 objects in the cache/i)
    );
    await waitForElement(() => rendered.getByText('sm-1'));
    await waitForElement(() => rendered.getByText('sm-2'));
  });
  it('the user can click on the state machines to get to the details page', async () => {
    rendered = renderApp({
      sdkMocks: [
        createStateMachinesListSdkMock(),
        createStateMachinesDetailSdkMockForId1(),
      ],
      permissions: {
        canViewDeveloperSettings: true,
        canManageDeveloperSettings: true,
      },
    });
    await waitForElement(() =>
      rendered.getByText(/There are 2 objects in the cache/i)
    );
    fireEvent.click(rendered.getByText('sm-1'));
    await wait(() => {
      expect(rendered.history.location.pathname).toBe(
        '/my-project/state-machines/sm1'
      );
    });
    await waitForElement(() => rendered.getByText(/sm-1/i));
  });
});

describe('details view', () => {
  let rendered;
  beforeAll(() => {
    applyUiKitMocks();
  });
  describe('when request is successful', () => {
    it('should render data on page', async () => {
      rendered = renderApp({
        route: '/my-project/state-machines/sm1',
        sdkMocks: [createStateMachinesDetailSdkMockForId1()],
        permissions: {
          canViewDeveloperSettings: true,
          canManageDeveloperSettings: true,
        },
      });
      await waitForElement(() => rendered.getByText(/sm-1/i));
    });
    it('should retrigger request if id changes', async () => {
      rendered = renderApp({
        route: '/my-project/state-machines/sm1',
        sdkMocks: [
          createStateMachinesDetailSdkMockForId1(),
          createStateMachinesDetailSdkMockForId2(),
        ],
        permissions: {
          canViewDeveloperSettings: true,
          canManageDeveloperSettings: true,
        },
      });
      await waitForElement(() => rendered.getByText(/sm-1/i));

      rendered.history.push('/my-project/state-machines/sm2');
      await waitForElement(() => rendered.getByText(/sm-2/i));
    });
  });
  describe('when request returns an error', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });
    it('should render notification error message', async () => {
      rendered = renderApp({
        route: '/my-project/state-machines/sm1',
        sdkMocks: [createStateMachinesDetailSdkErrorMock()],
        permissions: {
          canViewDeveloperSettings: true,
          canManageDeveloperSettings: true,
        },
      });
      await waitForElement(() =>
        rendered.getByText(/^Sorry, but there seems to be something wrong/i)
      );
    });
  });
});
