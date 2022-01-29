import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { screen, renderApp, waitFor } from '../../test-utils';
import FetchAllMenuFeatureToggles from './fetch-all-menu-feature-toggles.proxy.graphql';
import useAllMenuFeatureToggles from './use-all-menu-feature-toggles';

jest.mock('@commercetools-frontend/sentry');

const TestComponent = () => {
  const { isLoading, allFeatureToggles } = useAllMenuFeatureToggles();

  if (!isLoading) {
    return (
      <>
        <h3>Number of toggles: {Object.keys(allFeatureToggles).length}</h3>
        <ul>
          {Object.entries(allFeatureToggles).map(
            ([featureToggleName, featureToggleValue]) => (
              <div key={featureToggleName}>{`Toggle: ${featureToggleName} is ${
                featureToggleValue ? 'enabled' : 'disabled'
              }`}</div>
            )
          )}
        </ul>
      </>
    );
  }

  return <div>{'Loading'}</div>;
};

const mockRequests = {
  withoutError: {
    request: {
      query: FetchAllMenuFeatureToggles,
    },
    result: {
      data: {
        allFeatureToggles: ['flagA', 'flagB'],
      },
    },
  },
  withError: {
    request: {
      query: FetchAllMenuFeatureToggles,
    },
    result: {
      errors: [
        {
          message: 'There has been an error.',
        },
      ],
    },
  },
};

const render = ({ mocks, environment }) =>
  renderApp(<TestComponent />, {
    disableRoutePermissionCheck: true,
    mocks,
    environment,
  });

describe('when served by proxy', () => {
  describe('without error', () => {
    it('should be loading and return any feature toggles', async () => {
      render({
        environment: {
          servedByProxy: true,
        },
        mocks: [mockRequests.withoutError],
      });

      await screen.findByText('Loading');
      await screen.findByText(/Number of toggles: 2/i);
      await screen.findByText(/Toggle: flagA is disabled/i);
      await screen.findByText(/Toggle: flagB is disabled/i);
    });
  });

  describe('with error', () => {
    it('should be loading and return no feature toggles and report to sentry', async () => {
      render({
        environment: {
          servedByProxy: true,
        },
        mocks: [mockRequests.withError],
      });

      await screen.findByText('Loading');
      await screen.findByText(/Number of toggles: 0/i);

      await waitFor(() => {
        expect(reportErrorToSentry).toHaveBeenCalled();
      });
    });
  });
});

describe('when not served proxy', () => {
  it('should not be loading and not return any feature toggles', async () => {
    render({
      mocks: [mockRequests.withoutError],
    });

    expect(screen.queryByText('Loading')).not.toBeInTheDocument();

    await screen.findByText(/Number of toggles: 0/i);
  });
});
