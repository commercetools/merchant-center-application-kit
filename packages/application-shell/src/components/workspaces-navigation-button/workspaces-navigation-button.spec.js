import { useFlagVariation } from '@flopflip/react-broadcast';
import { screen, renderApp } from '../../test-utils';
import messages from './messages';
import WorkspacesNavigationButton from './index';

jest.mock('@flopflip/react-broadcast', () => ({
  useFlagVariation: jest.fn(),
}));

jest.mock('react-intl', () => ({
  useIntl: () => ({
    formatMessage: (message) => message.defaultMessage,
  }),
}));

const createTestProps = (custom = {}) => ({
  projectKey: 'test-project-key',
  ...custom,
});

describe('rendering', () => {
  it('should render the button when the feature flag is enabled and projectKey is provided', async () => {
    useFlagVariation.mockReturnValue({ value: true });

    const props = createTestProps();
    renderApp(<WorkspacesNavigationButton {...props} />);

    await screen.findByRole('button', { name: messages.label.defaultMessage });

    const link = screen.getByRole('link', {
      name: messages.label.defaultMessage,
    });
    expect(link).toHaveAttribute('href', `/${props.projectKey}/workspaces`);
  });

  it('should not render the button when the feature flag is disabled', () => {
    useFlagVariation.mockReturnValue({ value: false });

    const props = createTestProps();
    renderApp(<WorkspacesNavigationButton {...props} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should not render the button when projectKey is not provided', () => {
    useFlagVariation.mockReturnValue({ value: true });

    const props = createTestProps({ projectKey: undefined });
    renderApp(<WorkspacesNavigationButton {...props} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
