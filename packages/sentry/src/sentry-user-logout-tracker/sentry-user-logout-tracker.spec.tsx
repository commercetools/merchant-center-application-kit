import * as Sentry from '@sentry/react';
import { render } from '@testing-library/react';
import type { ApplicationWindow } from '@commercetools-frontend/constants';

import SentryUserLogoutTracker from './sentry-user-logout-tracker';

declare let window: ApplicationWindow;

// An explicit factory: the v10 package exports are not reassignable, so the
// mock has to be in place before the module is imported.
jest.mock('@sentry/react', () => ({
  getCurrentScope: jest.fn(),
}));

describe('SentryUserLogoutTracker', () => {
  beforeEach(() => {
    // Reset mocks and window state before each test
    jest.clearAllMocks();
    delete window.app?.trackingSentry;
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
