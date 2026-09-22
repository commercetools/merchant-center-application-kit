import { renderApp, screen } from '../../test-utils';

describe('ApplicationEntryPoint', () => {
  describe('when the application is project-keyless', () => {
    it('should render the application at /agent-sphere', async () => {
      renderApp(<p>Agent Sphere</p>, {
        disableRoutePermissionCheck: true,
        environment: {
          entryPointUriPath: 'agent-sphere',
        },
        route: '/agent-sphere',
        project: null,
      });

      await screen.findByText('Agent Sphere');
    });

    it('should render the application at nested project-keyless routes', async () => {
      renderApp(<p>Agent Sphere</p>, {
        disableRoutePermissionCheck: true,
        environment: {
          entryPointUriPath: 'agent-sphere',
        },
        route: '/agent-sphere/conversations',
        project: null,
      });

      await screen.findByText('Agent Sphere');
    });
  });

  describe('when the application is project-scoped', () => {
    it('should render the application at /:projectKey/:entryPointUriPath', async () => {
      renderApp(<p>Products</p>, {
        disableRoutePermissionCheck: true,
        environment: {
          entryPointUriPath: 'products',
        },
        route: '/my-project-key/products',
      });

      await screen.findByText('Products');
    });
  });
});
