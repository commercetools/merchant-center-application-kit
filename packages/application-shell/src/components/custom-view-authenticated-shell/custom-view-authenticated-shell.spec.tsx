import { mocked } from 'jest-mock';
import { graphql, rest } from 'msw';
import { screen, render, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';

import {
  UserMock,
  ProjectMock,
  // ProjectExtensionMock,
  // ApplicationAppbarMenuMock,
  // LegacyApplicationNavbarMenuMock,
  // LegacyApplicationNavbarSubmenuMock,
  // CustomApplicationInstallationMock,
} from '../../../../../graphql-test-utils';
import { STORAGE_KEYS } from '../../constants';
import ApplicationShellProvider from '../application-shell-provider';
import CustomViewAuthenticatedShell from './custom-view-authenticated-shell';

jest.mock('@commercetools-frontend/sentry');

const mockedProject = ProjectMock.build({
  key: 'test-1',
  name: 'Test 1',
});
const mockedUser = UserMock.build({
  defaultProjectKey: 'test-1',
  projects: {
    __typename: 'ProjectQueryResult',
    total: 1,
    results: [mockedProject],
  },
});

const mockedApplicationMessages = {
  'en-US': {
    'PageUnauthorized.title': 'We could not find what you are looking for',
    'PageUnauthorized.paragraph1':
      'The Module you are looking for either does not exist for this Project or you are not authorized to view it.',
    'PageUnauthorized.paragraph2':
      'Please contact your system administrator or the commercetools <a>Help Desk</a> if you have any further questions.',
  },
};
const mockedEnvironment = {
  applicationId: 'my-app-id',
  applicationName: 'My App Name',
  entryPointUriPath: '/',
  revision: '1',
  env: 'development',
  location: 'US',
  cdnUrl: 'https://my-cdn.com',
  mcApiUrl: 'https://my-mc-api.com',
  frontendHost: 'https://my-frontend-host.com',
  servedByProxy: false,
  ldClientSideId: 'my-ld-client-side-id',
  trackingSentry: 'my-tracking-sentry',
};

function TestComponent() {
  return (
    <ApplicationShellProvider
      environment={mockedEnvironment}
      applicationMessages={mockedApplicationMessages}
    >
      {() => {
        return (
          <CustomViewAuthenticatedShell
            dataLocale="en"
            environment={mockedEnvironment}
            messages={mockedApplicationMessages}
            projectKey="almond-40"
          >
            <div>Test children</div>
          </CustomViewAuthenticatedShell>
        );
      }}
    </ApplicationShellProvider>
  );
}

describe('custom-view-authenticated-shell', () => {
  const mockServer = setupServer(
    graphql.query('FetchProject', (req, res, ctx) => {
      if (req.variables.projectKey === 'not-found') {
        return res(ctx.data({ project: null }));
      }
      return res(ctx.data({ project: mockedProject }));
    })
  );

  beforeEach(() => {
    jest.clearAllMocks();

    window.localStorage.getItem.mockImplementation((key) => {
      switch (key) {
        case STORAGE_KEYS.IS_AUTHENTICATED:
          return 'true';
        case STORAGE_KEYS.IS_FORCED_MENU_OPEN:
          return 'true';
        case STORAGE_KEYS.ACTIVE_PROJECT_KEY:
          return null;
        default:
          return null;
      }
    });
  });
  afterEach(() => {
    mockServer.resetHandlers();
  });
  beforeAll(() =>
    mockServer.listen({
      onUnhandledRequest: 'error',
    })
  );
  afterAll(() => mockServer.close());

  it('should render components children', async () => {
    mockServer.use(
      graphql.query('FetchLoggedInUser', (_req, res, ctx) =>
        res(ctx.data({ user: mockedUser }))
      )
    );
    render(<TestComponent />);

    await screen.findByText('Test children');
  });

  it('should render unauthorized page if user fetching fails', async () => {
    mockServer.use(
      graphql.query('FetchLoggedInUser', (_req, res, ctx) =>
        res(ctx.errors([{ message: 'Unauthorized' }]))
      )
    );
    render(<TestComponent />);

    await screen.findByText('We could not find what you are looking for');
    expect(reportErrorToSentry).toHaveBeenCalled();
  });
});
