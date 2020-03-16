import React from 'react';
import { render, wait as waitFor } from '@testing-library/react';
import GtmUserLogoutTracker from './gtm-user-logout-tracker';

describe('rendering', () => {
  it('should unset user in gtm dataLayer', async () => {
    window.app = { trackingGtm: '111' };
    window.dataLayer = [];
    render(<GtmUserLogoutTracker />);
    await waitFor(() => {
      expect(window.dataLayer).toEqual(
        expect.arrayContaining([{ userId: undefined }])
      );
    });
  });
});
