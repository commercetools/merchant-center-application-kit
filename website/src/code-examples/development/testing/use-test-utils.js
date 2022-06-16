import {
  fireEvent,
  screen,
  renderAppWithRedux,
} from '@commercetools-frontend/application-shell/test-utils';
import { entryPointUriPath } from '../../constants/application';
import ApplicationRoutes from '../../routes';

const renderApp = (options = {}) => {
  const route = options.route || `/my-project/${entryPointUriPath}/channels`;
  renderAppWithRedux(<ApplicationRoutes />, {
    route,
    entryPointUriPath,
    // ...
    ...options,
  });
};

it('should render channels', async () => {
  mockServer.use(/* See mock setup */);

  renderApp();

  await screen.findByText('channel-key-0');
});
