import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import { renderAppWithRedux } from '@commercetools-frontend/application-shell/test-utils';
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
      canViewStateMachines: true,
      canManageStateMachines: true,
    },
    ...options,
  });
};

describe('when route is /state-machines', () => {
  let rendered;
  it('should render state machines', async () => {
    rendered = render({
      route: '/project/state-machines',
    });
    await rendered.findByText(/State machines/i);
  });
});

describe('when route is not /state-machines', () => {
  let rendered;
  it('should render catch all', async () => {
    rendered = render({
      route: '/project/xyz',
    });
    await rendered.findByText(/we could not find what you are looking for/i);
  });
});
