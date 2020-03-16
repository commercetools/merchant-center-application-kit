import React from 'react';
import { renderApp, wait as waitFor } from '../../test-utils';
import RouteCatchAll from './route-catch-all';

describe('rendering', () => {
  describe('when "servedByProxy" is "true"', () => {
    it('should force a page reload', async () => {
      window.location.reload = jest.fn();
      renderApp(<RouteCatchAll />, {
        environment: {
          servedByProxy: true,
        },
      });
      await waitFor(() => {
        expect(window.location.reload).toHaveBeenCalledWith(true);
      });
    });
  });
  describe('when "servedByProxy" is "false"', () => {
    it('should render 404 page', async () => {
      const rendered = renderApp(<RouteCatchAll />, {
        environment: {
          servedByProxy: false,
        },
      });
      await rendered.findByText('We could not find what you are looking for');
    });
  });
});
