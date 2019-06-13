import React from 'react';
import { render } from 'react-testing-library';
import * as Sentry from '@sentry/browser';
import SentryUserTracker from './sentry-user-tracker';

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
