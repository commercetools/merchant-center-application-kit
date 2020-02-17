import React from 'react';
import { renderAppWithRedux, wait } from '../../test-utils';
import RequestsInFlightLoader from './requests-in-flight-loader';

describe('rendering', () => {
  describe('when there are no requests in flight', () => {
    it('should not render loading spinner', async () => {
      const rendered = renderAppWithRedux(<RequestsInFlightLoader />, {
        storeState: { requestsInFlight: [] },
      });
      await wait(
        () => {
          expect(rendered.queryByText(/^Processing/)).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });
  describe('when there are requests in flight', () => {
    it('should render loading spinner', async () => {
      const rendered = renderAppWithRedux(<RequestsInFlightLoader />, {
        storeState: { requestsInFlight: ['one', 'two'] },
      });

      await rendered.findByText(/^Processing/);
    });
  });
});
