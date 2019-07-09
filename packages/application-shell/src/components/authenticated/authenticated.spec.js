import React from 'react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { renderApp, wait } from '../../test-utils';
import { STORAGE_KEYS } from '../../constants';
import AmILoggedInQuery from './authenticated.graphql';
import Authenticated from './authenticated';

const createTestProps = custom => ({
  render: jest.fn(() => <div />),
  ...custom,
});

describe('rendering', () => {
  beforeEach(() => {
    window.localStorage.getItem = jest.fn();
    window.localStorage.setItem = jest.fn();
    window.localStorage.removeItem = jest.fn();
  });
  let props;
  describe('when authenticated state was cached in local storage', () => {
    beforeEach(() => {
      window.localStorage.getItem.mockReturnValue('true');
      props = createTestProps();
      renderApp(<Authenticated {...props} />);
    });
    it('should call render with `isAuthenticated` set to true', () => {
      expect(props.render).toHaveBeenCalledWith({ isAuthenticated: true });
    });
  });
  describe('when authenticated state is not in local storage', () => {
    beforeEach(() => {
      window.localStorage.getItem.mockReturnValue(null);
      props = createTestProps();
    });
    describe('when authentication request succeeds', () => {
      beforeEach(() => {
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
      });
      it('should call render with `isAuthenticated` set to true', async () => {
        await wait(() => {
          expect(props.render).toHaveBeenCalledWith({ isAuthenticated: true });
        });
      });
      it('should put `isAuthenticated` into local storage', async () => {
        await wait(() => {
          expect(window.localStorage.setItem).toHaveBeenCalledWith(
            STORAGE_KEYS.IS_AUTHENTICATED,
            true
          );
        });
      });
    });
    describe('when authentication request fails', () => {
      beforeEach(() => {
        console.error = jest.fn();
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
                errors: [{ message: 'Unauthorized' }],
              },
            },
          ],
        });
      });
      it('should call render with `isAuthenticated` set to false', async () => {
        await wait(() => {
          expect(props.render).toHaveBeenCalledWith({ isAuthenticated: false });
        });
      });
      it('should not put `isAuthenticated` into local storage', async () => {
        await wait(
          () => {
            expect(window.localStorage.setItem).not.toHaveBeenCalled();
          },
          { timeout: 1000 }
        );
      });
      it('should unset any previous `isAuthenticated` in local storage', async () => {
        await wait(
          () => {
            expect(window.localStorage.removeItem).toHaveBeenCalledWith(
              STORAGE_KEYS.IS_AUTHENTICATED
            );
          },
          { timeout: 1000 }
        );
      });
    });
    describe('when authentication request is loading', () => {
      beforeEach(() => {
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
      });
      it('should not call render', async () => {
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
