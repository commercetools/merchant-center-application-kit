import React from 'react';
import {
  renderWithRedux,
  waitForElement,
} from '@commercetools-frontend/application-shell/test-utils';
import { ApplicationStateMachines } from '../entry-point';

const createStateMachinesSdkMock = () => ({
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

describe('list view', () => {
  it('the user can see a list of state machines', async () => {
    const initialRoute = '/my-project/state-machines';
    const { getByText } = renderWithRedux(<ApplicationStateMachines />, {
      route: initialRoute,
      sdkMocks: [createStateMachinesSdkMock()],
    });
    await waitForElement(() => getByText(/State machines/i));
    await waitForElement(() => getByText(/There are 2 objects in the cache/i));
    // TODO: the <Table> does not seem to be correctly rendered in the DOM with RTL,
    // because the width=0 and the content of the <Table> won't get rendered.
    // await waitForElement(() => getByText('sm-1'));
    // await waitForElement(() => getByText('sm-2'));
  });
});
