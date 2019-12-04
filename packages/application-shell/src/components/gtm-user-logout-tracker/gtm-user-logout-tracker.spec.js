import React from 'react';
import { render, wait } from '@testing-library/react';
import GtmUserLogoutTracker from './gtm-user-logout-tracker';

describe('rendering', () => {
  it('should unset user in gtm dataLayer', async () => {
    window.app = { trackingGtm: '111' };
    window.dataLayer = [];
    render(<GtmUserLogoutTracker />);
    await wait(() => {
      expect(window.dataLayer).toEqual(
        expect.arrayContaining([{ userId: undefined }])
      );
    });
  });
});
