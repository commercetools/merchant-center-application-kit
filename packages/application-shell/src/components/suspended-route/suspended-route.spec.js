import { lazy } from 'react';
import { screen, renderApp } from '../../test-utils';
import SuspendedRoute from './suspended-route';

const LazyLoadedComponent = lazy(() => import('./lazy-loaded-component'));

describe('rendering', () => {
  it('should render the lazy loaded component when no path provided', async () => {
    renderApp(
      <SuspendedRoute>
        <LazyLoadedComponent />
      </SuspendedRoute>
    );

    await screen.findByText('lazy-loaded component');
  });
  it('should render the lazy loaded component when path provided', async () => {
    const route = '/test-path';
    renderApp(
      <SuspendedRoute path={route}>
        <LazyLoadedComponent />
      </SuspendedRoute>,
      {
        disableAutomaticEntryPointRoutes: true,
        route,
      }
    );

    await screen.findByText('lazy-loaded component');
  });
});
