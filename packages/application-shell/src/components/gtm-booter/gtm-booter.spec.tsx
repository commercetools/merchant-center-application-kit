import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { ApplicationWindow } from '@commercetools-frontend/constants';
import GtmBooter, { Props } from './gtm-booter';

declare let window: ApplicationWindow;

const createTestProps = (custom: Partial<Props> = {}) => ({
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
          onClick={() => undefined}
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
