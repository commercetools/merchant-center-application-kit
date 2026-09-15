import * as Sentry from '@sentry/react';
import { addPerformanceMeasurementsToTransaction } from './report-performance-marks';
import { boot } from './sentry';

jest.mock('@sentry/react', () => ({
  ...jest.requireActual('@sentry/react'),
  init: jest.fn(),
  getCurrentScope: jest.fn(() => ({ setTag: jest.fn() })),
}));

describe('boot', () => {
  beforeEach(() => {
    // @ts-expect-error: only the fields `boot` reads.
    window.app = {
      trackingSentry: 'https://key@sentry.io/1',
      revision: 'rev',
      env: 'test',
      location: 'eu',
      cdnUrl: 'http://cdn',
      frontendHost: 'http://mc',
      applicationName: 'test-app',
    };
  });

  it('wires the performance measurements handler into Sentry.init', () => {
    boot();

    expect(Sentry.init).toHaveBeenCalledWith(
      expect.objectContaining({
        beforeSendTransaction: addPerformanceMeasurementsToTransaction,
      })
    );
  });
});
