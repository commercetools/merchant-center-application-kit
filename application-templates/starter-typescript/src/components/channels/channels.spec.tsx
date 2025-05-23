import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  screen,
  mapResourceAccessToAppliedPermissions,
  type TRenderAppWithReduxOptions,
} from '@commercetools-frontend/application-shell/test-utils';
import { buildGraphqlList } from '@commercetools/composable-commerce-test-data/core';
import {
  ChannelGraphql,
  type TChannelGraphql,
} from '@commercetools/composable-commerce-test-data/channel';
import { LocalizedString } from '@commercetools/composable-commerce-test-data/commons';
import { renderApplicationWithRedux } from '../../test-utils';
import { entryPointUriPath, PERMISSIONS } from '../../constants';
import ApplicationRoutes from '../../routes';

const mockServer = setupServer();
afterEach(() => mockServer.resetHandlers());
beforeAll(() => {
  mockServer.listen({
    // for debugging reasons we force an error when the test fires a request with a query or mutation which is not mocked
    // more: https://mswjs.io/docs/api/setup-worker/start#onunhandledrequest
    onUnhandledRequest: 'error',
  });
});
afterAll(() => {
  mockServer.close();
});

const renderApp = (options: Partial<TRenderAppWithReduxOptions> = {}) => {
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
          channels: buildGraphqlList<TChannelGraphql>(
            Array.from({ length: itemsPerPage }).map((_, index) =>
              ChannelGraphql.random()
                .nameAllLocales(LocalizedString.random())
                .key(`channel-key-${offset === 0 ? index : 20 + index}`)
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
