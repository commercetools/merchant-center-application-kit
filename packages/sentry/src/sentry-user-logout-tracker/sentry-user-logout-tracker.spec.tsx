import React from 'react';
import { render } from 'react-testing-library';
import SentryUserLogoutTracker, {
  stopTrackingUser,
} from './sentry-user-logout-tracker';

jest.mock('../sentry');

describe('rendering', () => {
  it('should call stopTrackingUser', () => {
    render(<SentryUserLogoutTracker />);
    expect(stopTrackingUser).toHaveBeenCalledTimes(1);
  });
});
