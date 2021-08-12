import { screen } from '@commercetools-frontend/application-shell/test-utils';
import { renderApplicationWithRedux } from '../../test-utils';
import { entryPointUriPath } from '../../constants/application';
import ApplicationRoutes from '../../routes';

const renderApp = (options = {}) => {
  const route = options.route || `/my-project/${entryPointUriPath}`;
  const { history } = renderApplicationWithRedux(<ApplicationRoutes />, {
    route,
    permissions: {
      canViewProducts: true,
    },
    ...options,
  });
  return { history };
};

it('should render welcome page', async () => {
  renderApp();
  await screen.findByText('Develop applications for the Merchant Center');
});
