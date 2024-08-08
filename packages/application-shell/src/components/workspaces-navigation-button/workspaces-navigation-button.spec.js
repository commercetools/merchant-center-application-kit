import { ENABLE_WORKSPACES_UI } from '@commercetools-frontend/constants/src/feature-toggles';
import { screen, renderApp } from '../../test-utils';
import WorkspacesNavigationButton, {
  FEATURE_NAME,
} from './workspaces-navigation-button';

describe('rendering', () => {
  it('should render the button when the feature flag is enabled and projectKey is provided', async () => {
    renderApp(<WorkspacesNavigationButton />, {
      flags: {
        [ENABLE_WORKSPACES_UI]: { value: true },
      },
    });

    const button = await screen.findByRole('button', {
      name: FEATURE_NAME,
    });

    expect(button).toHaveAttribute('href', `/workspaces`);
  });

  it('should not render the button when the feature flag is disabled', () => {
    renderApp(<WorkspacesNavigationButton />, {
      flags: {
        [ENABLE_WORKSPACES_UI]: { value: false },
      },
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
