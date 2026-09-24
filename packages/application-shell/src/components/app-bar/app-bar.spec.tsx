import { renderApp, screen } from '../../test-utils';
import type { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import { createGraphqlResponseForProjectsQuery } from '../project-switcher/project-switcher-test-utils';
import AppBar from './app-bar';

const createTestUser = (): NonNullable<TFetchLoggedInUserQuery['user']> => ({
  id: 'user-id-1',
  email: 'user@example.com',
  createdAt: '2020-01-01T12:29:33.916Z',
  gravatarHash: 'aaa',
  firstName: 'Sheldon',
  lastName: 'Cooper',
  language: 'en',
  numberFormat: 'en',
  timeZone: 'Etc/UTC',
  launchdarklyTrackingId: '111',
  launchdarklyTrackingGroup: 'commercetools',
  launchdarklyTrackingSubgroup: 'dev',
  launchdarklyTrackingCloudEnvironment: 'ctp_production_gcp_europe-west1_v1',
  defaultProjectKey: 'test-project',
  isAdminOfAnyOrganization: true,
  businessRole: 'Other',
  projects: {
    total: 1,
    results: [
      {
        name: 'Test project',
        key: 'test-project',
        isProductionProject: false,
        suspension: { isActive: false },
        expiry: { isActive: false },
      },
    ],
  },
});

const renderAppBar = ({
  route,
  projectKey = 'test-project',
}: {
  route: string;
  projectKey?: string;
}) =>
  renderApp(<AppBar user={createTestUser()} projectKey={projectKey} />, {
    disableAutomaticEntryPointRoutes: true,
    route,
    mocks: [createGraphqlResponseForProjectsQuery()],
  });

describe('when the route is a static path without a project context', () => {
  it('should not render the project switcher on /account', async () => {
    renderAppBar({ route: '/account' });

    expect(await screen.findByText('Back to project')).toBeInTheDocument();
    expect(screen.queryByLabelText('Projects')).not.toBeInTheDocument();
  });
});

describe('when the route is agent-sphere (project-keyless but in project context)', () => {
  it.each(['/agent-sphere', '/agent-sphere/registry'])(
    'should not render the project switcher or back-to-project on %s',
    async (route) => {
      renderAppBar({ route });

      // Wait for the app bar to finish rendering the authenticated user.
      expect(await screen.findByText('SC')).toBeInTheDocument();
      expect(screen.queryByLabelText('Projects')).not.toBeInTheDocument();
      expect(screen.queryByText('Back to project')).not.toBeInTheDocument();
    }
  );
});

describe('when the route is project-scoped', () => {
  it('should render the project switcher', async () => {
    renderAppBar({ route: '/test-project/products' });

    expect(await screen.findByLabelText('Projects')).toBeInTheDocument();
    expect(screen.queryByText('Back to project')).not.toBeInTheDocument();
  });
});
