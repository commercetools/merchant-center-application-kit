import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { Props } from './gtm-booter';

import GtmBooter from './gtm-booter';

declare let window: ApplicationWindow;

const createTestProps = (custom: Partial<Props> = {}) => ({
  trackingEventList: {
    'Test.button': 'Test.button',
  },
  ...custom,
});

describe('rendering', () => {
  it('should track event when clicking on an element', async () => {
    window.dataLayer = [];
    const props = createTestProps();
    render(
      <GtmBooter {...props}>
        <button
          data-track-component="Test.button"
          data-track-event="click"
          onClick={() => undefined}
        >
          {'Click me'}
        </button>
      </GtmBooter>
    );
    fireEvent.click(screen.getByText('Click me'));
    await waitFor(() => {
      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            trackingAction: 'click',
            trackingCategory: 'Test.button',
          }),
        ])
      );
    });
  });
});
