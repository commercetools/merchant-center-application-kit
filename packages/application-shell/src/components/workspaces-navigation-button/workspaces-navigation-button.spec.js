import { ENABLE_WORKSPACES_UI } from '@commercetools-frontend/constants/src/feature-toggles';
import { screen, renderApp } from '../../test-utils';
import WorkspacesNavigationButton, {
  FEATURE_NAME,
} from './workspaces-navigation-button';

const createTestProps = (custom = {}) => ({
  projectKey: 'test-project-key',
  ...custom,
});

describe('rendering', () => {
  it('should render the button when the feature flag is enabled and projectKey is provided', async () => {
    const props = createTestProps();

    renderApp(<WorkspacesNavigationButton {...props} />, {
      flags: {
        [ENABLE_WORKSPACES_UI]: { value: true },
      },
    });

    const button = await screen.findByRole('button', {
      name: FEATURE_NAME,
    });

    expect(button).toHaveAttribute('href', `/${props.projectKey}/workspaces`);
  });

  it('should not render the button when the feature flag is disabled', () => {
    const props = createTestProps();

    renderApp(<WorkspacesNavigationButton {...props} />, {
      flags: {
        [ENABLE_WORKSPACES_UI]: { value: false },
      },
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should not render the button when projectKey is not provided', () => {
    const props = createTestProps({
      projectKey: undefined,
    });

    renderApp(<WorkspacesNavigationButton {...props} />, {
      flags: {
        [ENABLE_WORKSPACES_UI]: { value: true },
      },
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
