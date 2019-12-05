import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import GtmBooter from './gtm-booter';

const createTestProps = custom => ({
  trackingEventWhitelist: {
    'Test.button': 'Test.button',
  },
  ...custom,
});

describe('rendering', () => {
  it('should track event when clicking on an element', async () => {
    window.dataLayer = [];
    const props = createTestProps();
    const rendered = render(
      <GtmBooter {...props}>
        <button
          data-track-component="Test.button"
          data-track-event="click"
          onClick={() => {}}
        >
          {'Click me'}
        </button>
      </GtmBooter>
    );
    fireEvent.click(rendered.getByText('Click me'));
    await wait(() => {
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
