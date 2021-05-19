import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import {
  screen,
  renderAppWithRedux,
} from '@commercetools-frontend/application-shell/test-utils';
import { ApplicationStateMachines } from './entry-point';

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
    results: [],
  },
});

const render = (options) => {
  return renderAppWithRedux(<ApplicationStateMachines />, {
    sdkMocks: [createStateMachinesListSdkMock()],
    permissions: {
      canViewPlaygroundStateMachines: true,
      canManagePlaygroundStateMachines: true,
    },
    ...options,
  });
};

describe('when route is /playground-state-machines', () => {
  it('should render state machines', async () => {
    render({
      route: '/project/playground-state-machines',
    });
    await screen.findByText(/State machines/i);
  });
});

describe('when route is not /playground-state-machines', () => {
  it('should render catch all', async () => {
    render({
      route: '/project/xyz',
    });
    await screen.findByText(/we could not find what you are looking for/i);
  });
});
