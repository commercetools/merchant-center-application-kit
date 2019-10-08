import React from 'react';
import {
  renderAppWithRedux,
  RenderResult,
  wait,
  waitForElement,
} from '../../test-utils';
import RequestsInFlightLoader from './requests-in-flight-loader';

describe('rendering', () => {
  let rendered: RenderResult;
  describe('when there are no requests in flight', () => {
    beforeEach(() => {
      rendered = renderAppWithRedux(<RequestsInFlightLoader />, {
        storeState: { requestsInFlight: [] },
      });
    });
    it('should not render loading spinner', () =>
      wait(
        () => {
          expect(rendered.queryByText(/^Processing/)).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      ));
  });
  describe('when there are requests in flight', () => {
    beforeEach(() => {
      rendered = renderAppWithRedux(<RequestsInFlightLoader />, {
        storeState: { requestsInFlight: ['one', 'two'] },
      });
    });
    it('should render loading spinner', () =>
      waitForElement(() => rendered.queryByText(/^Processing/)));
  });
});
