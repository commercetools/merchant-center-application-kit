import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  screen,
  waitFor,
  within,
  mapResourceAccessToAppliedPermissions,
} from '@commercetools-frontend/application-shell/test-utils';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { buildGraphqlList } from '@commercetools-test-data/core';
import * as Channel from '@commercetools-test-data/channel';
import { LocalizedString } from '@commercetools-test-data/commons';
import { renderApplicationWithRoutesAndRedux } from '../../test-utils';
import { entryPointUriPath, PERMISSIONS } from '../../constants';

jest.mock('@commercetools-frontend/sentry');

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

const id = 'b8a40b99-0c11-43bc-8680-fc570d624747';
const key = 'test-key';
const newKey = 'new-test-key';

const renderApp = (options = {}, includeManagePermissions = true) => {
  const route =
    options.route || `/my-project/${entryPointUriPath}/channels/${id}`;
  const { history } = renderApplicationWithRoutesAndRedux({
    route,
    project: {
      allAppliedPermissions: mapResourceAccessToAppliedPermissions(
        [
          PERMISSIONS.View,
          includeManagePermissions && PERMISSIONS.Manage,
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
          .key(key)
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
          .key(key)
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
          extensions: {
            code: 'DuplicateField',
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

const useMockServerHandlers = (
  fetchChannelDetailsQueryHandler,
  updateChannelDetailsMutationHandler
) => {
  mockServer.use(
    ...[
      graphql.query('FetchChannels', (_req, res, ctx) => {
        const totalItems = 2;

        return res(
          ctx.data({
            channels: buildGraphqlList(
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
      fetchChannelDetailsQueryHandler,
      updateChannelDetailsMutationHandler,
    ].filter(Boolean)
  );
};

describe('rendering', () => {
  it('should render channel details', async () => {
    useMockServerHandlers(fetchChannelDetailsQueryHandler);
    renderApp();

    const keyInput = await screen.findByLabelText(/channel key/i);
    expect(keyInput.value).toBe(key);

    screen.getByRole('combobox', { name: /channel roles/i });
    expect(screen.getByDisplayValue(/primary/i)).toBeInTheDocument();
  });
  it('should reset form values on "revert" button click', async () => {
    useMockServerHandlers(fetchChannelDetailsQueryHandler);
    renderApp();

    const resetButton = await screen.findByRole('button', {
      name: /revert/i,
    });
    expect(resetButton).toBeDisabled();

    const keyInput = await screen.findByLabelText(/channel key/i);
    expect(keyInput.value).toBe(key);

    fireEvent.change(keyInput, {
      target: { value: newKey },
    });
    expect(keyInput.value).toBe(newKey);

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(keyInput.value).toBe(key);
    });
  });
  describe('when user has no manage permission', () => {
    it('should render the form as read-only and keep the "save" button "disabled"', async () => {
      useMockServerHandlers(
        fetchChannelDetailsQueryHandler,
        updateChannelDetailsHandler
      );
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
    useMockServerHandlers(fetchChannelDetailsQueryHandlerWithNullData);
    renderApp();

    await screen.findByRole('heading', {
      name: /we could not find what you are looking for/i,
    });
  });
  it('should display a key field validation message if the submitted key value is duplicated', async () => {
    useMockServerHandlers(
      fetchChannelDetailsQueryHandler,
      updateChannelDetailsHandlerWithDuplicateFieldError
    );
    renderApp();

    const keyInput = await screen.findByLabelText(/channel key/i);

    fireEvent.change(keyInput, {
      target: { value: newKey },
    });
    expect(keyInput.value).toBe(newKey);

    // updating channel details
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    await screen.findByText(/a channel with this key already exists/i);
  });
});
describe('notifications', () => {
  it('should render a success notification after an update', async () => {
    useMockServerHandlers(
      fetchChannelDetailsQueryHandler,
      updateChannelDetailsHandler
    );
    renderApp();

    const keyInput = await screen.findByLabelText(/channel key/i);
    expect(keyInput.value).toBe(key);

    fireEvent.change(keyInput, {
      target: { value: newKey },
    });
    expect(keyInput.value).toBe(newKey);

    const rolesSelect = screen.getByRole('combobox', {
      name: /channel roles/i,
    });
    fireEvent.focus(rolesSelect);
    fireEvent.keyDown(rolesSelect, { key: 'ArrowDown' });
    screen.getByText('InventorySupply').click();
    expect(screen.getByDisplayValue(/InventorySupply/i)).toBeInTheDocument();

    // updating channel details
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    const notification = await screen.findByRole('alertdialog');
    within(notification).getByText(/channel .+ updated/i);
  });
  it('should render an error notification if fetching channel details resulted in an error', async () => {
    useMockServerHandlers(fetchChannelDetailsQueryHandlerWithError);
    renderApp();
    await screen.findByText(
      /please check your connection, the provided channel ID and try again/i
    );
  });
  it('should display an error notification if an update resulted in an unmapped error', async () => {
    useMockServerHandlers(
      fetchChannelDetailsQueryHandler,
      updateChannelDetailsHandlerWithARandomError
    );
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

    expect(reportErrorToSentry).toHaveBeenCalled();
  });
});
