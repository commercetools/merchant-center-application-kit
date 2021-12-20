import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  screen,
  mapResourceAccessToAppliedPermissions,
} from '@commercetools-frontend/application-shell/test-utils';
import { buildGraphqlList } from '@commercetools-test-data/core';
import { renderApplicationWithRedux } from '../../test-utils';
import * as ChannelMock from '../../test-utils/test-data/channel';
import { entryPointUriPath, PERMISSIONS } from '../../constants';
import ApplicationRoutes from '../../routes';

const mockServer = setupServer();
afterEach(() => mockServer.resetHandlers());
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mockServer.close());

const renderApp = (options = {}) => {
  const route = options.route || `/my-project/${entryPointUriPath}/channels`;
  const { history } = renderApplicationWithRedux(<ApplicationRoutes />, {
    route,
    project: {
      allAppliedPermissions: mapResourceAccessToAppliedPermissions([
        PERMISSIONS.View,
      ]),
    },
    ...options,
  });
  return { history };
};

it('should render channels and paginate to second page', async () => {
  mockServer.use(
    graphql.query('FetchChannels', (req, res, ctx) => {
      // Simulate a server side pagination.
      const { offset } = req.variables;
      const totalItems = 25; // 2 pages
      const itemsPerPage = offset === 0 ? 20 : 5;

      return res(
        ctx.data({
          channels: buildGraphqlList(
            Array.from({ length: itemsPerPage }).map((_, index) =>
              ChannelMock.random().key(
                `channel-key-${offset === 0 ? index : 20 + index}`
              )
            ),
            {
              name: 'Channel',
              total: totalItems,
            }
          ),
        })
      );
    })
  );
  renderApp();

  // First page
  await screen.findByText('channel-key-0');
  expect(screen.queryByText('channel-key-22')).not.toBeInTheDocument();

  // Go to second page
  fireEvent.click(screen.getByLabelText('Next page'));

  // Second page
  await screen.findByText('channel-key-22');
  expect(screen.queryByText('channel-key-0')).not.toBeInTheDocument();
});
