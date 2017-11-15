import toGlobal from 'core/utils/to-global';
import { SHOW_LOADING, HIDE_LOADING } from 'core/constants';
import middleware from './middleware';
import client from './client';

jest.mock('./client');

const createConsoleMock = () => ({
  groupCollapsed: () => jest.fn(),
  groupEnd: () => jest.fn(),
  log: () => jest.fn(),
});

const globalAppState = { token: 'foo', currentProjectKey: 'bar' };

describe('when the action is of type SDK', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-console
    global.console = createConsoleMock();
  });
  describe('no matter the method', () => {
    describe('when making the request', () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ globalAppState }));
      const action = {
        type: 'SDK',
        payload: { service: 'productTypes', method: 'fetch' },
      };
      const next = jest.fn();
      const response = { body: 'foo' };
      beforeEach(() => {
        client.execute = jest.fn(() => Promise.resolve(response));
        return middleware({ dispatch, getState })(next)(action);
      });

      it('should call `client.execute`', () => {
        expect(client.execute).toHaveBeenCalledTimes(1);
      });

      it('should call `client.execute` with uri, method and headers', () => {
        expect(client.execute).toHaveBeenCalledWith({
          uri: expect.any(String),
          method: 'GET',
          headers: {
            Authorization: globalAppState.token,
          },
        });
      });

      it('should mark the request as started', () => {
        expect(dispatch).toHaveBeenCalledWith(
          toGlobal({
            type: SHOW_LOADING,
            payload: 'sdk.fetch(/bar/product-types)',
          })
        );
      });

      it('should not call `next`', () => {
        expect(next).toHaveBeenCalledTimes(0);
      });
    });
    describe('when the request is successful', () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ globalAppState }));
      const action = {
        type: 'SDK',
        payload: { service: 'productTypes', method: 'fetch' },
      };
      const next = jest.fn();
      const response = { body: 'foo' };
      let resultPromise;
      beforeEach(() => {
        client.execute = jest.fn(() => Promise.resolve(response));
        resultPromise = middleware({ dispatch, getState })(next)(action);
      });

      it('should mark the request as completed', () => {
        expect(dispatch).toHaveBeenCalledWith(
          toGlobal({
            type: HIDE_LOADING,
            payload: 'sdk.fetch(/bar/product-types)',
          })
        );
      });

      it('should return a resolving promise', async () => {
        await expect(resultPromise).resolves.toBe(response.body);
      });
    });

    describe('when the request fails', () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ globalAppState }));
      const action = {
        type: 'SDK',
        payload: { service: 'productTypes', method: 'fetch' },
      };
      const next = jest.fn();
      const expectedError = { body: 'foo' };
      let resultPromise;
      beforeEach(() => {
        client.execute = jest.fn(() => Promise.reject(expectedError));
        resultPromise = middleware({ dispatch, getState })(next)(action);
        // We catch all errors here so that they don't throw globally
        // This is necessary because the rejected promise rethrows from
        // the handler
        return resultPromise.catch(error => {
          if (error === expectedError) return;
          throw error;
        });
      });

      it('should mark the request as completed', () => {
        expect.hasAssertions();
        expect(dispatch).toHaveBeenCalledWith(
          toGlobal({
            type: HIDE_LOADING,
            payload: 'sdk.fetch(/bar/product-types)',
          })
        );
      });

      it('should return a rejecting promise', async () => {
        await expect(resultPromise).rejects.toBe(expectedError);
      });
    });
  });

  describe('when the method is "fetch"', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ globalAppState }));
    const action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'fetch' },
    };
    const next = jest.fn();
    const response = { body: 'foo' };
    let resultPromise;
    beforeEach(() => {
      client.execute = jest.fn(() => Promise.resolve(response));
      resultPromise = middleware({ dispatch, getState })(next)(action);
    });

    it('should return the body of the fetch result', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });

    it('should call `client.execute`', () => {
      expect(client.execute).toHaveBeenCalledTimes(1);
    });

    it('should call `client.execute` with uri, method and headers', () => {
      expect(client.execute).toHaveBeenCalledWith({
        uri: expect.any(String),
        method: 'GET',
        headers: {
          Authorization: globalAppState.token,
        },
      });
    });
  });

  describe('when the method is "update"', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ globalAppState }));
    const action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'update', payload: {} },
    };
    const next = jest.fn();
    const response = { body: 'foo' };
    let resultPromise;
    beforeEach(() => {
      client.execute = jest.fn(() => Promise.resolve(response));
      resultPromise = middleware({ dispatch, getState })(next)(action);
    });

    it('should return the result the update', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });
    it('should call `client.execute`', () => {
      expect(client.execute).toHaveBeenCalledTimes(1);
    });

    it('should call `client.execute` with uri, method, headers and body', () => {
      expect(client.execute).toHaveBeenCalledWith({
        uri: expect.any(String),
        method: 'POST',
        headers: {
          Authorization: globalAppState.token,
        },
        body: expect.any(Object),
      });
    });
  });
});

describe('when the action is not of type SDK', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const action = { type: 'FOO' };
  const next = jest.fn(() => 'result-of-next');
  let result;
  beforeEach(() => {
    result = middleware({ dispatch, getState })(next)(action);
  });

  it('should call `next` with the action', () => {
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should return the result of `next`', () => {
    expect(result).toBe('result-of-next');
  });
});
