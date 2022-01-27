import { screen, renderAppWithRedux, waitFor } from '../../test-utils';
import RequestsInFlightLoader from './requests-in-flight-loader';

describe('rendering', () => {
  describe('when there are no requests in flight', () => {
    it('should not render loading spinner', async () => {
      renderAppWithRedux(<RequestsInFlightLoader />, {
        disableRoutePermissionCheck: true,
        storeState: { requestsInFlight: [] },
      });
      await waitFor(() => {
        expect(screen.queryByText(/^Processing/)).not.toBeInTheDocument();
      });
    });
  });
  describe('when there are requests in flight', () => {
    it('should render loading spinner', async () => {
      renderAppWithRedux(<RequestsInFlightLoader />, {
        disableRoutePermissionCheck: true,
        storeState: { requestsInFlight: ['one', 'two'] },
      });

      await screen.findByText(/^Processing/);
    });
  });
});
