import React from 'react';
import { render } from 'react-testing-library';
import SentryUserTracker, { updateUser } from './sentry-user-tracker';

jest.mock('../sentry');

describe('rendering', () => {
  describe('when user is not defined', () => {
    it('should not sync user', () => {
      render(<SentryUserTracker />);
      expect(updateUser).not.toHaveBeenCalled();
    });
  });
  describe('when user is defined', () => {
    it('should sync user', () => {
      render(<SentryUserTracker user={{ id: '1', email: 'john@snow.got' }} />);
      expect(updateUser).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'john@snow.got' })
      );
    });
  });
});
