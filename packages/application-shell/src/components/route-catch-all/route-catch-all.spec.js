import { mocked } from 'jest-mock';
import { screen, renderApp, waitFor } from '../../test-utils';
import { location } from '../../utils/location';
import RouteCatchAll from './route-catch-all';

jest.mock('../../utils/location');

describe('rendering', () => {
  beforeEach(() => {
    mocked(location.reload).mockClear();
  });
  describe('when "servedByProxy" is "true"', () => {
    it('should force a page reload', async () => {
      renderApp(<RouteCatchAll />, {
        disableRoutePermissionCheck: true,
        environment: {
          servedByProxy: true,
        },
      });
      await waitFor(() => {
        expect(location.reload).toHaveBeenCalled();
      });
    });
  });
  describe('when "servedByProxy" is "false"', () => {
    it('should render 404 page', async () => {
      renderApp(<RouteCatchAll />, {
        disableRoutePermissionCheck: true,
        environment: {
          servedByProxy: false,
        },
      });
      await screen.findByText('We could not find what you are looking for');
    });
  });
});
