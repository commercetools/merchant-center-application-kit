import { render, waitFor } from '@testing-library/react';
import GtmUserTracker from './gtm-user-tracker';

describe('rendering', () => {
  it('should unset user in gtm dataLayer', async () => {
    window.app = { trackingGtm: '111' };
    window.dataLayer = [];
    render(<GtmUserTracker user={{ id: 'user-id' }} />);
    await waitFor(() => {
      expect(window.dataLayer).toEqual(
        expect.arrayContaining([{ userId: 'user-id' }])
      );
    });
  });
});
