import { renderApp, screen } from '../../test-utils';
import OidcCallback from './oidc-callback';

describe('failed OIDC authentication', () => {
  describe('when sessionToken is missing', () => {
    it('should show oidc callback error page', async () => {
      renderApp(<OidcCallback locale="en" applicationMessages={{}} />, {
        route: '/project/app/oidc/callback',
        disableAutomaticEntryPointRoutes: true,
        disableRoutePermissionCheck: true,
      });
      await screen.findByText('Authentication error');
      screen.getByText('Invalid client session (missing sessionToken)');
    });
  });
  describe('when sessionToken is invalid', () => {
    it('should show oidc callback error page', async () => {
      renderApp(<OidcCallback locale="en" applicationMessages={{}} />, {
        route: '/project/app/oidc/callback#sessionToken=123',
        disableAutomaticEntryPointRoutes: true,
        disableRoutePermissionCheck: true,
      });
      await screen.findByText('Authentication error');
      screen.getByText('Invalid token specified');
    });
  });
});
