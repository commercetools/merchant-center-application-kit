import { graphql, type GraphQLHandler } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  screen,
  waitFor,
  within,
  mapResourceAccessToAppliedPermissions,
  type TRenderAppWithReduxOptions,
} from '@commercetools-frontend/application-shell/test-utils';
import { buildGraphqlList } from '@commercetools-test-data/core';
import type { TChannel } from '@commercetools-test-data/channel';
import * as Channel from '@commercetools-test-data/channel';
import { LocalizedString } from '@commercetools-test-data/commons';
import { renderApplicationWithRoutesAndRedux } from '../../test-utils';
import { entryPointUriPath, PERMISSIONS } from '../../constants';

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

const TEST_CHANNEL_ID = 'b8a40b99-0c11-43bc-8680-fc570d624747';
const TEST_CHANNEL_KEY = 'test-key';
const TEST_CHANNEL_NEW_KEY = 'new-test-key';

const renderApp = (
  options: Partial<TRenderAppWithReduxOptions> = {},
  includeManagePermissions = true
) => {
  const route =
    options.route ||
    `/my-project/${entryPointUriPath}/channels/${TEST_CHANNEL_ID}`;
  const { history } = renderApplicationWithRoutesAndRedux({
    route,
    project: {
      allAppliedPermissions: mapResourceAccessToAppliedPermissions(
        [
          PERMISSIONS.View,
          includeManagePermissions ? PERMISSIONS.Manage : '',
        ].filter(Boolean)
      ),
    },
    ...options,
  });
  return { history };
};

const fetchChannelDetailsQueryHandler = graphql.query(
  'FetchChannelDetails',
  (_req, res, ctx) => {
    return res(
      ctx.data({
        channel: Channel.random()
          .name(LocalizedString.random())
          .key(TEST_CHANNEL_KEY)
          .buildGraphql(),
      })
    );
  }
);

const fetchChannelDetailsQueryHandlerWithNullData = graphql.query(
  'FetchChannelDetails',
  (_req, res, ctx) => {
    return res(ctx.data({ channel: null }));
  }
);

const fetchChannelDetailsQueryHandlerWithError = graphql.query(
  'FetchChannelDetails',
  (_req, res, ctx) => {
    return res(
      ctx.data({ channel: null }),
      ctx.errors([
        {
          message: "Field '$channelId' has wrong value: Invalid ID.",
        },
      ])
    );
  }
);

const updateChannelDetailsHandler = graphql.mutation(
  'UpdateChannelDetails',
  (_req, res, ctx) => {
    return res(
      ctx.data({
        updateChannel: Channel.random()
          .name(LocalizedString.random())
          .key(TEST_CHANNEL_KEY)
          .buildGraphql(),
      })
    );
  }
);

const updateChannelDetailsHandlerWithDuplicateFieldError = graphql.mutation(
  'UpdateChannelDetails',
  (_req, res, ctx) => {
    return res(
      ctx.data({ updateChannel: null }),
      ctx.errors([
        {
          message: "A duplicate value '\"test-key\"' exists for field 'key'.",
          extensions: {
            code: 'DuplicateField',
            duplicateValue: 'test-key',
            field: 'key',
          },
        },
      ])
    );
  }
);

const updateChannelDetailsHandlerWithARandomError = graphql.mutation(
  'UpdateChannelDetails',
  (_req, res, ctx) => {
    return res(
      ctx.data({ updateChannel: null }),
      ctx.errors([
        {
          message: 'Some fake error message.',
          code: 'SomeFakeErrorCode',
        },
      ])
    );
  }
);

const useMockServerHandlers = (handlers: GraphQLHandler[]) => {
  mockServer.use(
    graphql.query('FetchChannels', (_req, res, ctx) => {
      const totalItems = 2;

      return res(
        ctx.data({
          channels: buildGraphqlList<TChannel>(
            Array.from({ length: totalItems }).map((_, index) =>
              Channel.random()
                .name(LocalizedString.random())
                .key(`channel-key-${index}`)
            ),
            {
              name: 'Channel',
              total: totalItems,
            }
          ),
        })
      );
    }),
    ...handlers
  );
};

describe('rendering', () => {
  it('should render channel details', async () => {
    useMockServerHandlers([fetchChannelDetailsQueryHandler]);
    renderApp();

    const keyInput: HTMLInputElement = await screen.findByLabelText(
      /channel key/i
    );
    expect(keyInput.value).toBe(TEST_CHANNEL_KEY);

    screen.getByRole('combobox', { name: /channel roles/i });
    expect(screen.getByDisplayValue(/primary/i)).toBeInTheDocument();
  });
  it('should reset form values on "revert" button click', async () => {
    useMockServerHandlers([fetchChannelDetailsQueryHandler]);
    renderApp();

    const resetButton = await screen.findByRole('button', {
      name: /revert/i,
    });
    expect(resetButton).toBeDisabled();

    const keyInput: HTMLInputElement = await screen.findByLabelText(
      /channel key/i
    );
    expect(keyInput.value).toBe(TEST_CHANNEL_KEY);

    fireEvent.change(keyInput, {
      target: { value: TEST_CHANNEL_NEW_KEY },
    });
    expect(keyInput.value).toBe(TEST_CHANNEL_NEW_KEY);

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(keyInput.value).toBe(TEST_CHANNEL_KEY);
    });
  });
  describe('when user has no manage permission', () => {
    it('should render the form as read-only and keep the "save" button "disabled"', async () => {
      useMockServerHandlers([
        fetchChannelDetailsQueryHandler,
        updateChannelDetailsHandler,
      ]);
      renderApp({}, false);

      const keyInput = await screen.findByLabelText(/channel key/i);
      expect(keyInput.hasAttribute('readonly')).toBeTruthy();

      const nameInput = screen.getByLabelText(/en/i, { selector: 'input' });
      expect(nameInput.hasAttribute('readonly')).toBeTruthy();

      const rolesSelect = screen.getByRole('combobox', {
        name: /channel roles/i,
      });
      expect(rolesSelect.hasAttribute('readonly')).toBeTruthy();

      const saveButton = screen.getByRole('button', { name: /save/i });
      expect(saveButton).toBeDisabled();
    });
  });
  it('should display a "page not found" information if the fetched channel details data is null (without an error)', async () => {
    useMockServerHandlers([fetchChannelDetailsQueryHandlerWithNullData]);
    renderApp();

    await screen.findByRole('heading', {
      name: /we could not find what you are looking for/i,
    });
  });
  it('should display a key field validation message if the submitted key value is duplicated', async () => {
    useMockServerHandlers([
      fetchChannelDetailsQueryHandler,
      updateChannelDetailsHandlerWithDuplicateFieldError,
    ]);
    renderApp();

    const keyInput: HTMLInputElement = await screen.findByLabelText(
      /channel key/i
    );

    fireEvent.change(keyInput, {
      target: { value: TEST_CHANNEL_NEW_KEY },
    });
    expect(keyInput.value).toBe(TEST_CHANNEL_NEW_KEY);

    // updating channel details
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    await screen.findByText(/a channel with this key already exists/i);
  });
});
describe('notifications', () => {
  it('should render a success notification after an update', async () => {
    useMockServerHandlers([
      fetchChannelDetailsQueryHandler,
      updateChannelDetailsHandler,
    ]);
    renderApp();

    const keyInput: HTMLInputElement = await screen.findByLabelText(
      /channel key/i
    );
    expect(keyInput.value).toBe(TEST_CHANNEL_KEY);

    fireEvent.change(keyInput, {
      target: { value: TEST_CHANNEL_NEW_KEY },
    });
    expect(keyInput.value).toBe(TEST_CHANNEL_NEW_KEY);

    const rolesSelect = screen.getByRole('combobox', {
      name: /channel roles/i,
    });
    fireEvent.focus(rolesSelect);
    fireEvent.keyDown(rolesSelect, { key: 'ArrowDown' });
    const inventorySupplyOption = await screen.findByText('InventorySupply');

    inventorySupplyOption.click();
    expect(screen.getByDisplayValue(/InventorySupply/i)).toBeInTheDocument();

    // updating channel details
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    const notification = await screen.findByRole('alertdialog');
    within(notification).getByText(/channel .+ updated/i);
  });
  it('should render an error notification if fetching channel details resulted in an error', async () => {
    useMockServerHandlers([fetchChannelDetailsQueryHandlerWithError]);
    renderApp();
    await screen.findByText(
      /please check your connection, the provided channel ID and try again/i
    );
  });
  it('should display an error notification if an update resulted in an unmapped error', async () => {
    // Mock error log
    jest.spyOn(console, 'error').mockImplementation();

    useMockServerHandlers([
      fetchChannelDetailsQueryHandler,
      updateChannelDetailsHandlerWithARandomError,
    ]);
    renderApp();

    const keyInput = await screen.findByLabelText(/channel key/i);

    // we're firing the input change to enable the save button, the value itself is not relevant
    fireEvent.change(keyInput, {
      target: { value: 'not relevant' },
    });

    // updating channel details
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    const notification = await screen.findByRole('alertdialog');
    within(notification).getByText(/some fake error message/i);
  });
});
