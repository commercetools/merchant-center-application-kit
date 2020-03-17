import { mocked } from 'ts-jest/utils';
import React from 'react';
import { renderApp, wait as waitFor } from '../../test-utils';
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
        environment: {
          servedByProxy: true,
        },
      });
      await waitFor(() => {
        expect(location.reload).toHaveBeenCalledWith(true);
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
