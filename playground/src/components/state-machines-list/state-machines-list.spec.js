import React from 'react';
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
      uri: '/my-project/states?limit=25&offset=0',
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
const createStateMachinesDetailSdkMock = () => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'GET',
      service: 'states',
      options: { id: 'sm1' },
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

const render = (options = {}) => {
  const route = options.route || '/my-project/state-machines';
  return renderAppWithRedux(<ApplicationStateMachines />, {
    route,
    ...options,
  });
};

describe('list view', () => {
  beforeAll(() => {
    applyUiKitMocks();
  });
  it('the user can see a list of state machines', async () => {
    const { getByText } = render({
      sdkMocks: [createStateMachinesListSdkMock()],
    });
    await waitForElement(() => getByText(/State machines/i));
    await waitForElement(() => getByText(/There are 2 objects in the cache/i));
    await waitForElement(() => getByText('sm-1'));
    await waitForElement(() => getByText('sm-2'));
  });
  it('the user can click on the state machines to get to the details page', async () => {
    const { getByText, history } = render({
      sdkMocks: [
        createStateMachinesListSdkMock(),
        createStateMachinesDetailSdkMock(),
      ],
    });
    await waitForElement(() => getByText(/There are 2 objects in the cache/i));
    fireEvent.click(getByText('sm-1'));
    await wait(() => {
      expect(history.location.pathname).toBe('/my-project/state-machines/sm1');
    });
    await waitForElement(() => getByText(/sm-1/i));
  });
});
