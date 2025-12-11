import * as Sentry from '@sentry/react';
import { render } from '@testing-library/react';
import type { ApplicationWindow } from '@commercetools-frontend/constants';

import SentryUserLogoutTracker from './sentry-user-logout-tracker';

declare let window: ApplicationWindow;

jest.mock('@sentry/react');

describe('SentryUserLogoutTracker', () => {
  beforeEach(() => {
    // Reset mocks and window state before each test
    jest.clearAllMocks();
    delete window.app?.trackingSentry;
    // Mock getCurrentScope to return an object with a clear method
    (Sentry.getCurrentScope as jest.Mock) = jest.fn(() => ({
      clear: jest.fn(),
    }));
  });

  describe('when Sentry tracking is enabled', () => {
    it('should clear the Sentry scope on mount', () => {
      window.app = { trackingSentry: 'enabled' } as ApplicationWindow['app'];
      const clearMock = jest.fn();
      (Sentry.getCurrentScope as jest.Mock).mockReturnValue({
        clear: clearMock,
      });

      render(<SentryUserLogoutTracker />);

      expect(Sentry.getCurrentScope).toHaveBeenCalled();
      expect(clearMock).toHaveBeenCalled();
    });
  });

  describe('when Sentry tracking is not enabled', () => {
    it('should do nothing when trackingSentry is not set', () => {
      window.app = {} as ApplicationWindow['app'];
      const clearMock = jest.fn();
      (Sentry.getCurrentScope as jest.Mock).mockReturnValue({
        clear: clearMock,
      });

      render(<SentryUserLogoutTracker />);

      expect(Sentry.getCurrentScope).not.toHaveBeenCalled();
      expect(clearMock).not.toHaveBeenCalled();
    });

    it('should not clear the Sentry scope when trackingSentry is undefined', () => {
      window.app = { trackingSentry: undefined } as ApplicationWindow['app'];
      const clearMock = jest.fn();
      (Sentry.getCurrentScope as jest.Mock).mockReturnValue({
        clear: clearMock,
      });

      render(<SentryUserLogoutTracker />);

      expect(Sentry.getCurrentScope).not.toHaveBeenCalled();
      expect(clearMock).not.toHaveBeenCalled();
    });
  });
});
