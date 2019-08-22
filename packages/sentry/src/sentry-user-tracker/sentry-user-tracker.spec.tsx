import React from 'react';
import { render } from '@testing-library/react';
import * as Sentry from '@sentry/browser';
import { ApplicationWindow } from '@commercetools-frontend/constants';
import SentryUserTracker from './sentry-user-tracker';

declare let window: ApplicationWindow;

jest.mock('@sentry/browser');

describe('rendering', () => {
  describe('when user is not defined', () => {
    it('should not sync user', () => {
      render(<SentryUserTracker />);
      expect(Sentry.setUser).not.toHaveBeenCalled();
    });
  });
  describe('when user is defined', () => {
    it('should sync user', () => {
      window.app.trackingSentry = 'enabled';
      render(<SentryUserTracker user={{ id: '1', email: 'john@snow.got' }} />);
      expect(Sentry.setUser).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'xxx@snow.got' })
      );
    });
  });
});
