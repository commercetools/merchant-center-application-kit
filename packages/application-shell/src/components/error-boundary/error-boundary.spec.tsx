import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import ErrorBoundary from './error-boundary';

jest.mock('@commercetools-frontend/sentry', () => ({
  reportErrorToSentry: jest.fn(),
}));

const error = new Error('Boom from the NavBar');

const ThrowingComponent = () => {
  throw error;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // React logs caught render errors to `console.error`.
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.mocked(reportErrorToSentry).mockClear();
  });

  it('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  describe('when rendered above the IntlProvider', () => {
    it('renders the apologizer page', async () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(
        await screen.findByText('Sorry! An unexpected error occured.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Our team has been notified about this issue.')
      ).toBeInTheDocument();
    });

    it('reports the original error to Sentry', async () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      await screen.findByText('Sorry! An unexpected error occured.');
      expect(reportErrorToSentry).toHaveBeenCalledTimes(1);
      expect(reportErrorToSentry).toHaveBeenCalledWith(
        error,
        expect.objectContaining({ extra: expect.anything() })
      );
    });
  });

  describe('when rendered within an IntlProvider', () => {
    it('renders the apologizer page with the provided messages', async () => {
      render(
        <IntlProvider
          locale="de"
          messages={{ 'ErrorApologizer.title': 'Ein Fehler ist aufgetreten.' }}
        >
          <ErrorBoundary>
            <ThrowingComponent />
          </ErrorBoundary>
        </IntlProvider>
      );

      expect(
        await screen.findByText('Ein Fehler ist aufgetreten.')
      ).toBeInTheDocument();
      expect(reportErrorToSentry).toHaveBeenCalledWith(
        error,
        expect.anything()
      );
    });
  });
});
