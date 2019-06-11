import React from 'react';
import { render } from '@testing-library/react';
import { stopTrackingUser } from '../sentry';
import SentryUserLogoutTracker from './sentry-user-logout-tracker';

jest.mock('../sentry');

describe('rendering', () => {
  it('should call stopTrackingUser', () => {
    render(<SentryUserLogoutTracker />);
    expect(stopTrackingUser).toHaveBeenCalledTimes(1);
  });
});
