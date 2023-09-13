import { CustomViewData } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  screen,
  renderComponent,
  waitFor,
  fireEvent,
} from '../../../test-utils';
import {
  TCustomViewSize,
  TCustomViewType,
} from '../../../types/generated/settings';
import CustomViewLoader from './custom-view-loader';

const mockShowNotification = jest.fn();

jest.mock('@commercetools-frontend/sentry');
jest.mock('@commercetools-frontend/actions-global', () => ({
  useShowNotification: () => mockShowNotification,
}));

// TODO: We must add this entity to the test data repository
const TEST_CUSTOM_VIEW: CustomViewData = {
  id: 'd8eafca6-1f89-4a84-b93f-ef94f869abcf',
  defaultLabel: 'Test Custom View',
  labelAllLocales: [],
  url: '/',
  type: TCustomViewType.CustomPanel,
  typeSettings: {
    size: TCustomViewSize.Small,
  },
  locators: ['customers.customer-detail.addresses'],
  permissions: [],
};

describe('CustomViewLoader', () => {
  beforeAll(() => {
    window.MessageChannel = jest.fn(() => ({
      port1: {
        onmessage: jest.fn(),
        postMessage: jest.fn(),
        close: jest.fn(),
        onmessageerror: jest.fn(),
        start: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      },
      port2: {
        onmessage: jest.fn(),
        postMessage: jest.fn(),
        close: jest.fn(),
        onmessageerror: jest.fn(),
        start: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      },
    }));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a custom view', async () => {
    renderComponent(
      <CustomViewLoader customView={TEST_CUSTOM_VIEW} onClose={jest.fn()} />
    );

    const iFrame = screen.getByTitle(
      `Custom View: ${TEST_CUSTOM_VIEW.defaultLabel}`
    ) as HTMLIFrameElement;
    expect(iFrame.getAttribute('id')).toBe(
      `custom-view-${TEST_CUSTOM_VIEW.id}`
    );
    expect(iFrame.getAttribute('src')).toContain(
      `/custom-views/${TEST_CUSTOM_VIEW.id}/projects/no-project`
    );
  });

  it('should show a notification when the custom view fails to load', async () => {
    const customView = {
      ...TEST_CUSTOM_VIEW,
      url: 'https://example.com/',
    };

    renderComponent(
      <CustomViewLoader customView={customView} onClose={jest.fn()} />
    );

    fireEvent.load(
      screen.getByTitle(`Custom View: ${TEST_CUSTOM_VIEW.defaultLabel}`)
    );

    expect(mockShowNotification).toHaveBeenCalledWith({
      domain: 'page',
      kind: 'error',
      text: 'We could not load the Custom View. Please contact your administrator to check its configuration.',
    });
  });

  it('should render nothing when the custom view type is not known', () => {
    const customView = {
      ...TEST_CUSTOM_VIEW,
      type: 'InvalidType',
    };

    renderComponent(
      // Ignore the TS error because we want to test an unknown type
      // @ts-ignore
      <CustomViewLoader customView={customView} onClose={jest.fn()} />
    );

    expect(
      screen.queryByTitle(`Custom View: ${TEST_CUSTOM_VIEW.defaultLabel}`)
    ).not.toBeInTheDocument();
    expect(reportErrorToSentry).toHaveBeenCalledWith(
      new Error(
        `CustomViewLoader: Provided Custom View has an unsupported type: ${customView.type}. Supported types: ['CustomPanel'].`
      )
    );
  });

  it('should call onClose when the custom view is closed', async () => {
    const onCloseMock = jest.fn();

    renderComponent(
      <CustomViewLoader customView={TEST_CUSTOM_VIEW} onClose={onCloseMock} />
    );

    const closeButton = screen.getByLabelText('Close Modal Page');
    fireEvent.click(closeButton);

    await waitFor(() => expect(onCloseMock).toHaveBeenCalled());
  });
});
