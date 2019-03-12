import React from 'react';
import * as storage from '@commercetools-frontend/storage';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { render, wait } from '../../test-utils';
import { STORAGE_KEYS } from '../../constants';
import AmILoggedInQuery from './authenticated.graphql';
import Authenticated from './authenticated';

jest.mock('@commercetools-frontend/storage');

const createTestProps = custom => ({
  render: jest.fn(() => <div />),
  ...custom,
});

describe('rendering', () => {
  let props;
  describe('when authenticated state was cached in local storage', () => {
    beforeEach(() => {
      storage.get.mockReturnValue('true');
      props = createTestProps();
      render(<Authenticated {...props} />);
    });
    it('should call render with `isAuthenticated` set to true', () => {
      expect(props.render).toHaveBeenCalledWith({ isAuthenticated: true });
    });
  });
  describe('when authenticated state is not in local storage', () => {
    beforeEach(() => {
      storage.get.mockReturnValue(null);
      props = createTestProps();
    });
    describe('when authentication request succeeds', () => {
      beforeEach(() => {
        render(<Authenticated {...props} />, {
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
          expect(storage.put).toHaveBeenCalledWith(
            STORAGE_KEYS.IS_AUTHENTICATED,
            true
          );
        });
      });
    });
    describe('when authentication request fails', () => {
      beforeEach(() => {
        console.error = jest.fn();
        render(<Authenticated {...props} />, {
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
            expect(storage.put).not.toHaveBeenCalledWith();
          },
          { timeout: 1000 }
        );
      });
    });
    describe('when authentication request is loading', () => {
      beforeEach(() => {
        render(<Authenticated {...props} />, {
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
