import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-frontend/constants';
import toGlobal from '@commercetools-frontend/actions-global/to-global';
import createMiddleware from './middleware';
import createClient from './client';

jest.mock('./client');
jest.mock('../utils');

const middlewareOptions = {
  getCorrelationId: jest.fn(),
  getProjectKey: jest.fn(() => 'test-project'),
};

describe('when the action is of type SDK', () => {
  describe('no matter the method', () => {
    describe('when making the request', () => {
      const dispatch = jest.fn();
      const action = {
        type: 'SDK',
        payload: { service: 'productTypes', method: 'GET' },
      };
      const next = jest.fn();
      const response = { body: 'foo', headers: {} };
      let execute;
      beforeEach(() => {
        execute = jest.fn(() => Promise.resolve(response));
        createClient.mockReturnValue({
          execute,
        });

        return createMiddleware(middlewareOptions)({ dispatch })(next)(action);
      });

      it('should call `client.execute`', () => {
        expect(execute).toHaveBeenCalledTimes(1);
      });

      it('should call `client.execute` with uri, method and headers', () => {
        expect(execute).toHaveBeenCalledWith({
          uri: expect.any(String),
          method: 'GET',
          headers: expect.objectContaining({
            Accept: 'application/json',
            'X-Project-Key': 'test-project',
          }),
        });
      });

      it('should mark the request as started', () => {
        expect(dispatch).toHaveBeenCalledWith(
          toGlobal({
            type: SHOW_LOADING,
            payload: 'sdk.get(/test-project/product-types)',
          })
        );
      });

      it('should not call `next`', () => {
        expect(next).toHaveBeenCalledTimes(0);
      });
    });
    describe('when the request is successful', () => {
      const dispatch = jest.fn();
      const action = {
        type: 'SDK',
        payload: { service: 'productTypes', method: 'GET' },
      };
      const next = jest.fn();
      const response = { body: 'foo', headers: {} };
      let resultPromise;
      let execute;
      beforeEach(() => {
        execute = jest.fn(() => Promise.resolve(response));
        createClient.mockReturnValue({
          execute,
        });

        resultPromise = createMiddleware(middlewareOptions)({ dispatch })(next)(
          action
        );
      });

      it('should mark the request as completed', () => {
        expect(dispatch).toHaveBeenCalledWith(
          toGlobal({
            type: HIDE_LOADING,
            payload: 'sdk.get(/test-project/product-types)',
          })
        );
      });

      it('should return a resolving promise', async () => {
        await expect(resultPromise).resolves.toBe(response.body);
      });
    });

    describe('when the request fails', () => {
      const dispatch = jest.fn();
      const action = {
        type: 'SDK',
        payload: { service: 'productTypes', method: 'GET' },
      };
      const next = jest.fn();
      const expectedError = { body: 'foo', headers: {} };
      let resultPromise;
      let execute;
      beforeEach(() => {
        execute = jest.fn(() => Promise.reject(expectedError));
        createClient.mockReturnValue({
          execute,
        });

        resultPromise = createMiddleware(middlewareOptions)({ dispatch })(next)(
          action
        );
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
            payload: 'sdk.get(/test-project/product-types)',
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
    const action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'GET' },
    };
    const next = jest.fn();
    const expectedError = { statusCode: 401, body: 'foo', headers: {} };
    const response = { body: 'foo', headers: {} };
    let resultPromise;
    let execute;
    beforeEach(() => {
      execute = jest
        .fn()
        .mockReturnValueOnce(Promise.reject(expectedError))
        .mockReturnValueOnce(Promise.resolve(response));
      createClient.mockReturnValue({
        execute,
      });

      resultPromise = createMiddleware(middlewareOptions)({ dispatch })(next)(
        action
      );
      // We catch all errors here so that they don't throw globally
      // This is necessary because the rejected promise rethrows from
      // the handler
      return resultPromise.catch(error => {
        if (error === expectedError) return;
        throw error;
      });
    });
    it('should retry the request with the X-Force-Token header', () => {
      expect(execute).toHaveBeenCalledTimes(2);
      const firstCall = execute.mock.calls[0][0];
      expect(firstCall.headers).not.toHaveProperty('X-Force-Token');
      const secondCall = execute.mock.calls[1][0];
      expect(secondCall.headers).toHaveProperty('X-Force-Token');
      expect(secondCall.headers['X-Force-Token']).toBe('true');
    });
  });

  describe('when the request always fails with 401', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'GET' },
    };
    const next = jest.fn();
    const expectedError = { statusCode: 401, body: 'foo', headers: {} };
    let resultPromise;
    let execute;
    beforeEach(() => {
      execute = jest.fn(() => Promise.reject(expectedError));
      createClient.mockReturnValue({
        execute,
      });
      resultPromise = createMiddleware(middlewareOptions)({ dispatch })(next)(
        action
      );
      // We catch all errors here so that they don't throw globally
      // This is necessary because the rejected promise rethrows from
      // the handler
      return resultPromise.catch(error => {
        if (error === expectedError) return;
        throw error;
      });
    });
    it('should only retry once', () => {
      expect(execute).toHaveBeenCalledTimes(2);
      const firstCall = execute.mock.calls[0][0];
      expect(firstCall.headers).not.toHaveProperty('X-Force-Token');
      const secondCall = execute.mock.calls[1][0];
      expect(secondCall.headers).toHaveProperty('X-Force-Token');
      expect(secondCall.headers['X-Force-Token']).toBe('true');
    });
  });

  describe('when the method is "get"', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'GET' },
    };
    const next = jest.fn();
    const response = { body: 'foo', headers: {} };
    let resultPromise;
    let execute;
    beforeEach(() => {
      execute = jest.fn(() => Promise.resolve(response));
      createClient.mockReturnValue({
        execute,
      });
      resultPromise = createMiddleware(middlewareOptions)({ dispatch })(next)(
        action
      );
    });

    it('should return the body of the fetch result', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });

    it('should call `client.execute`', () => {
      expect(execute).toHaveBeenCalledTimes(1);
    });

    it('should call `client.execute` with uri, method and headers', () => {
      expect(execute).toHaveBeenCalledWith({
        uri: expect.any(String),
        method: 'GET',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'X-Project-Key': 'test-project',
        }),
      });
    });
  });

  describe('when the method is "post"', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'POST', payload: {} },
    };
    const next = jest.fn();
    const response = { body: 'foo', headers: {} };
    let resultPromise;
    let execute;
    beforeEach(() => {
      execute = jest.fn(() => Promise.resolve(response));
      createClient.mockReturnValue({
        execute,
      });

      resultPromise = createMiddleware(middlewareOptions)({ dispatch })(next)(
        action
      );
    });

    it('should return the result the update', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });
    it('should call `client.execute`', () => {
      expect(execute).toHaveBeenCalledTimes(1);
    });

    it('should call `client.execute` with uri, method, headers and body', () => {
      expect(execute).toHaveBeenCalledWith({
        uri: expect.any(String),
        method: 'POST',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'X-Project-Key': 'test-project',
        }),
        body: expect.any(Object),
      });
    });
  });
});

describe('when the action is not of type SDK', () => {
  const dispatch = jest.fn();
  const action = { type: 'FOO' };
  const next = jest.fn(() => 'result-of-next');
  let result;
  beforeEach(() => {
    createClient.mockReturnValue({
      execute: jest.fn(),
    });
    result = createMiddleware(middlewareOptions)({ dispatch })(next)(action);
  });

  it('should call `next` with the action', () => {
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should return the result of `next`', () => {
    expect(result).toBe('result-of-next');
  });
});

describe('when the projectKey is not defined', () => {
  const dispatch = jest.fn();
  let action;
  const next = jest.fn(() => 'result-of-next');
  beforeEach(() => {
    createClient.mockReturnValue({
      execute: jest.fn(),
    });
    action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'GET' },
    };
  });
  it('should throw an error with message containing URI', () => {
    expect(() =>
      createMiddleware({
        getCorrelationId: jest.fn(),
        getProjectKey: jest.fn(() => null),
      })({ dispatch })(next)(action)
    ).toThrowError(
      'Expected projectKey to be defined for action service "productTypes" (method "GET")'
    );
  });
});
