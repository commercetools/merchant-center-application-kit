import {
  SHOW_LOADING,
  HIDE_LOADING,
  TOKEN_SET,
} from '@commercetools-local/constants';
import toGlobal from '@commercetools-local/utils/to-global';
import middleware from './middleware';
import client from './client';

jest.mock('./client');
jest.mock('../utils');

const globalAppState = { token: 'foo', currentProjectKey: 'bar' };

describe('when the action is of type SDK', () => {
  describe('no matter the method', () => {
    describe('when making the request', () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ globalAppState }));
      const action = {
        type: 'SDK',
        payload: { service: 'productTypes', method: 'fetch' },
      };
      const next = jest.fn();
      const response = { body: 'foo', headers: {} };
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
      const response = { body: 'foo', headers: {} };
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

    describe('when the request contains a new JWT token', () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ globalAppState }));
      const action = {
        type: 'SDK',
        payload: { service: 'productTypes', method: 'fetch' },
      };
      const next = jest.fn();
      const response = {
        headers: { 'x-set-token': 'new token' },
      };
      beforeEach(() => {
        client.execute = jest.fn(() => Promise.resolve(response));
        middleware({ dispatch, getState })(next)(action);
      });

      it('should update the token', () => {
        expect(dispatch).toHaveBeenCalledWith(
          toGlobal({
            type: TOKEN_SET,
            payload: 'new token',
          })
        );
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
      const expectedError = { body: 'foo', headers: {} };
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

  describe('when the request fails with 401', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ globalAppState }));
    const action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'fetch' },
    };
    const next = jest.fn();
    const expectedError = { statusCode: 401, body: 'foo', headers: {} };
    const response = { body: 'foo', headers: {} };
    let resultPromise;
    beforeEach(() => {
      client.execute = jest
        .fn()
        .mockReturnValueOnce(Promise.reject(expectedError))
        .mockReturnValueOnce(Promise.resolve(response));
      resultPromise = middleware({ dispatch, getState })(next)(action);
      // We catch all errors here so that they don't throw globally
      // This is necessary because the rejected promise rethrows from
      // the handler
      return resultPromise.catch(error => {
        if (error === expectedError) return;
        throw error;
      });
    });
    it('should retry the request with the X-Force-Token header', () => {
      expect(client.execute).toHaveBeenCalledTimes(2);
      const firstCall = client.execute.mock.calls[0][0];
      expect(firstCall.headers).not.toHaveProperty('X-Force-Token');
      const secondCall = client.execute.mock.calls[1][0];
      expect(secondCall.headers).toHaveProperty('X-Force-Token');
      expect(secondCall.headers['X-Force-Token']).toBe('true');
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
    const response = { body: 'foo', headers: {} };
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
    const response = { body: 'foo', headers: {} };
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
