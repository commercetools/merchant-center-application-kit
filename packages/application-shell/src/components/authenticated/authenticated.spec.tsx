import { mocked } from 'ts-jest/utils';
import React from 'react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { GraphQLError } from 'graphql';
import { renderApp, wait } from '../../test-utils';
import { STORAGE_KEYS } from '../../constants';
import AmILoggedInQuery from './authenticated.mc.graphql';
import Authenticated, { TProps } from './authenticated';

const createTestProps = (custom: Partial<TProps> = {}) => ({
  render: jest.fn(() => <div />),
  ...custom,
});

beforeEach(() => {
  mocked(window.localStorage.setItem).mockClear();
  mocked(window.localStorage.getItem).mockClear();
  mocked(window.localStorage.removeItem).mockClear();
});

describe('rendering', () => {
  describe('when authenticated state was cached in local storage', () => {
    it('should call render with `isAuthenticated` set to true', async () => {
      mocked(window.localStorage.getItem).mockReturnValue('true');
      const props = createTestProps();
      renderApp(<Authenticated {...props} />);
      await wait(() => {
        expect(props.render).toHaveBeenCalledWith({ isAuthenticated: true });
      });
    });
  });
  describe('when authenticated state is not in local storage', () => {
    describe('when authentication request succeeds', () => {
      it('should call render with `isAuthenticated` set to true', async () => {
        mocked(window.localStorage.getItem).mockReturnValue(null);
        const props = createTestProps();
        renderApp(<Authenticated {...props} />, {
          mocks: [
            {
              request: {
                query: AmILoggedInQuery,
                variables: {
                  target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
                },
              },
              result: {
                data: { loading: false, amILoggedIn: true },
              },
            },
          ],
        });
        await wait(() => {
          expect(props.render).toHaveBeenCalledWith({ isAuthenticated: true });
        });
        expect(mocked(window.localStorage.setItem)).toHaveBeenCalledWith(
          STORAGE_KEYS.IS_AUTHENTICATED,
          'true'
        );
      });
    });
    describe('when authentication request fails', () => {
      it('should call render with `isAuthenticated` set to false', async () => {
        console.error = jest.fn();
        mocked(window.localStorage.getItem).mockReturnValue(null);
        const props = createTestProps();
        renderApp(<Authenticated {...props} />, {
          mocks: [
            {
              request: {
                query: AmILoggedInQuery,
                variables: {
                  target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
                },
              },
              result: {
                data: null,
                errors: [new GraphQLError('Unauthorized')],
              },
            },
          ],
        });
        await wait(() => {
          expect(props.render).toHaveBeenCalledWith({ isAuthenticated: false });
        });
        expect(mocked(window.localStorage.setItem)).not.toHaveBeenCalled();
        expect(mocked(window.localStorage.removeItem)).toHaveBeenCalledWith(
          STORAGE_KEYS.IS_AUTHENTICATED
        );
      });
    });
    describe('when authentication request is loading', () => {
      it('should not call render', async () => {
        mocked(window.localStorage.getItem).mockReturnValue(null);
        const props = createTestProps();
        renderApp(<Authenticated {...props} />, {
          mocks: [
            {
              request: {
                query: AmILoggedInQuery,
                variables: {
                  target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
                },
              },
              result: {
                data: { loading: true, amILoggedIn: null },
              },
            },
          ],
        });
        await wait(
          () => {
            expect(props.render).not.toHaveBeenCalled();
          },
          { timeout: 1000 }
        );
      });
    });
  });
});
