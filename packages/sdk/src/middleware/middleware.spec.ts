import type { SuccessResult, ClientRequest } from '@commercetools/sdk-client';
import type { Json, TSdkAction } from '../types';

import { mocked } from 'jest-mock';
import {
  SHOW_LOADING,
  HIDE_LOADING,
  MC_API_PROXY_TARGETS,
} from '@commercetools-frontend/constants';
import * as sdkActions from '../actions';
import createMiddleware from './middleware';
import createClient from './client';

jest.mock('./client');
jest.mock('../utils');

const middlewareOptions = {
  getCorrelationId: jest.fn(),
  getProjectKey: jest.fn(() => 'test-project'),
  getAdditionalHeaders: jest.fn(() => ({ 'X-Team-Id': 'test-team' })),
};

describe('when the action is of type SDK', () => {
  let execute: (request: ClientRequest) => Promise<SuccessResult>;
  let resultPromise: Promise<Json>;
  describe('no matter the method', () => {
    describe('when making the request', () => {
      const dispatch = jest.fn();
      const action = sdkActions.get({ service: 'productTypes', options: {} });
      const next = jest.fn();
      const response = { body: { foo: 'bar' }, headers: {}, statusCode: 200 };
      beforeEach(() => {
        execute = jest.fn(() => Promise.resolve(response));
        mocked(createClient).mockReturnValue({
          execute,
        });

        return createMiddleware(middlewareOptions)({
          dispatch,
          getState: jest.fn(),
        })(next)(action);
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
        expect(dispatch).toHaveBeenCalledWith({
          type: SHOW_LOADING,
          payload: 'sdk.get(/test-project/product-types)',
        });
      });

      it('should not call `next`', () => {
        expect(next).toHaveBeenCalledTimes(0);
      });
    });
    describe('when there is a mcApiProxyTarget', () => {
      const dispatch = jest.fn();
      const action = sdkActions.get({
        uri: '/foo',
        mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
      });
      const next = jest.fn();
      const response = { body: { foo: 'bar' }, headers: {}, statusCode: 200 };
      beforeEach(() => {
        execute = jest.fn(() => Promise.resolve(response));
        mocked(createClient).mockReturnValue({
          execute,
        });

        return createMiddleware(middlewareOptions)({
          dispatch,
          getState: jest.fn(),
        })(next)(action);
      });

      it('should call `client.execute` with uri with prefix', () => {
        expect(execute).toHaveBeenCalledWith(
          expect.objectContaining({
            uri: '/proxy/ctp/foo',
          })
        );
      });
    });
    describe('when the request is successful', () => {
      const dispatch = jest.fn();
      const action = sdkActions.get({ service: 'productTypes', options: {} });
      const next = jest.fn();
      const response = { body: { foo: 'bar' }, headers: {}, statusCode: 200 };
      beforeEach(() => {
        execute = jest.fn(() => Promise.resolve(response));
        mocked(createClient).mockReturnValue({
          execute,
        });

        resultPromise = createMiddleware(middlewareOptions)({
          dispatch,
          getState: jest.fn(),
        })(next)(action);
      });

      it('should mark the request as completed', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: HIDE_LOADING,
          payload: 'sdk.get(/test-project/product-types)',
        });
      });

      it('should return a resolving promise', async () => {
        await expect(resultPromise).resolves.toBe(response.body);
      });
    });

    describe('when the request fails', () => {
      const dispatch = jest.fn();
      const action = sdkActions.get({ service: 'productTypes', options: {} });
      const next = jest.fn();
      const expectedError = { body: 'foo', headers: {} };
      beforeEach(() => {
        execute = jest.fn(() => Promise.reject(expectedError));
        mocked(createClient).mockReturnValue({
          execute,
        });

        resultPromise = createMiddleware(middlewareOptions)({
          dispatch,
          getState: jest.fn(),
        })(next)(action);
        // We catch all errors here so that they don't throw globally
        // This is necessary because the rejected promise rethrows from
        // the handler
        return resultPromise.catch((error) => {
          if (error === expectedError) return;
          throw error;
        });
      });

      it('should mark the request as completed', () => {
        expect.hasAssertions();
        expect(dispatch).toHaveBeenCalledWith({
          type: HIDE_LOADING,
          payload: 'sdk.get(/test-project/product-types)',
        });
      });

      it('should return a rejecting promise', async () => {
        await expect(resultPromise).rejects.toBe(expectedError);
      });
    });
  });

  describe('when the request fails with 401', () => {
    const dispatch = jest.fn();
    const action = sdkActions.get({ service: 'productTypes', options: {} });
    const next = jest.fn();
    const expectedError = { statusCode: 401, body: 'foo', headers: {} };
    const response = { body: { foo: 'bar' }, headers: {}, statusCode: 200 };
    beforeEach(() => {
      execute = jest
        .fn()
        .mockReturnValueOnce(Promise.reject(expectedError))
        .mockReturnValueOnce(Promise.resolve(response));
      mocked(createClient).mockReturnValue({
        execute,
      });

      resultPromise = createMiddleware(middlewareOptions)({
        dispatch,
        getState: jest.fn(),
      })(next)(action);
      // We catch all errors here so that they don't throw globally
      // This is necessary because the rejected promise rethrows from
      // the handler
      return resultPromise.catch((error) => {
        if (error === expectedError) return;
        throw error;
      });
    });
    it('should retry the request with the X-Force-Token header', () => {
      expect(execute).toHaveBeenCalledTimes(2);
      expect(execute).toHaveBeenNthCalledWith(
        1,
        expect.not.objectContaining({
          headers: expect.objectContaining({
            'X-Force-Token': expect.anything(),
          }),
        })
      );
      expect(execute).toHaveBeenLastCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({ 'X-Force-Token': 'true' }),
        })
      );
    });
  });

  describe('when the request always fails with 401', () => {
    const dispatch = jest.fn();
    const action = sdkActions.get({ service: 'productTypes', options: {} });
    const next = jest.fn();
    const expectedError = { statusCode: 401, body: 'foo', headers: {} };
    beforeEach(() => {
      execute = jest.fn(() => Promise.reject(expectedError));
      mocked(createClient).mockReturnValue({
        execute,
      });
      resultPromise = createMiddleware(middlewareOptions)({
        dispatch,
        getState: jest.fn(),
      })(next)(action);
      // We catch all errors here so that they don't throw globally
      // This is necessary because the rejected promise rethrows from
      // the handler
      return resultPromise.catch((error) => {
        if (error === expectedError) return;
        throw error;
      });
    });
    it('should only retry once', () => {
      expect(execute).toHaveBeenCalledTimes(2);
      expect(execute).toHaveBeenNthCalledWith(
        1,
        expect.not.objectContaining({
          headers: expect.objectContaining({
            'X-Force-Token': expect.anything(),
          }),
        })
      );
      expect(execute).toHaveBeenLastCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({ 'X-Force-Token': 'true' }),
        })
      );
    });
  });

  describe('when the method is "get"', () => {
    const dispatch = jest.fn();
    const action = sdkActions.get({ service: 'productTypes', options: {} });
    const next = jest.fn();
    const response = { body: { foo: 'bar' }, headers: {}, statusCode: 200 };
    beforeEach(() => {
      execute = jest.fn(() => Promise.resolve(response));
      mocked(createClient).mockReturnValue({
        execute,
      });
      resultPromise = createMiddleware(middlewareOptions)({
        dispatch,
        getState: jest.fn(),
      })(next)(action);
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

  describe('when `service=orderEdits` and `applyOrderEditTo`', () => {
    const dispatch = jest.fn();
    const orderId = 'order-to-edit-id-1';
    const action = sdkActions.post({
      service: 'orderEdits',
      options: { applyOrderEditTo: orderId },
      payload: {},
    });
    const next = jest.fn();
    const response = { body: { foo: 'bar' }, headers: {}, statusCode: 200 };
    beforeEach(() => {
      execute = jest.fn(() => Promise.resolve(response));
      mocked(createClient).mockReturnValue({
        execute,
      });
      resultPromise = createMiddleware(middlewareOptions)({
        dispatch,
        getState: jest.fn(),
      })(next)(action);
    });
    it('should return the result the update', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });
    it('should call `client.execute`', () => {
      expect(execute).toHaveBeenCalledTimes(1);
    });
    it('should call `client.execute` with uri, method, headers and body', () => {
      expect(execute).toHaveBeenCalledWith({
        // https://github.com/commercetools/nodejs/blob/master/packages/api-request-builder/src/create-service.js#L141:L141
        // https://github.com/commercetools/nodejs/blob/master/packages/api-request-builder/src/build-query-string.js#L123:L123
        uri: `/test-project/orders/edits/${orderId}/apply`,
        method: 'POST',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'X-Project-Key': 'test-project',
        }),
        body: expect.any(Object),
      });
    });
  });
  describe('when `service=orderEdits` and no `applyOrderEditTo`', () => {
    const dispatch = jest.fn();
    const orderId = 'order-to-edit-id-1';
    const action = sdkActions.post({
      service: 'orderEdits',
      options: { id: orderId },
      payload: {},
    });
    const next = jest.fn();
    const response = { body: { foo: 'bar' }, headers: {}, statusCode: 200 };
    beforeEach(() => {
      execute = jest.fn(() => Promise.resolve(response));
      mocked(createClient).mockReturnValue({
        execute,
      });
      resultPromise = createMiddleware(middlewareOptions)({
        dispatch,
        getState: jest.fn(),
      })(next)(action);
    });
    it('should return the result the update', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });
    it('should call `client.execute`', () => {
      expect(execute).toHaveBeenCalledTimes(1);
    });
    it('should call `client.execute` with uri, method, headers and body', () => {
      expect(execute).toHaveBeenCalledWith({
        // https://github.com/commercetools/nodejs/blob/master/packages/api-request-builder/src/create-service.js#L141:L141
        // https://github.com/commercetools/nodejs/blob/master/packages/api-request-builder/src/build-query-string.js#L123:L123
        uri: `/test-project/orders/edits/${orderId}`,
        method: 'POST',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'X-Project-Key': 'test-project',
        }),
        body: expect.any(Object),
      });
    });
  });

  describe('when the method is "post"', () => {
    const dispatch = jest.fn();
    const action = sdkActions.post({
      service: 'productTypes',
      options: {},
      payload: {},
    });
    const next = jest.fn();
    const response = { body: { foo: 'bar' }, headers: {}, statusCode: 200 };
    beforeEach(() => {
      execute = jest.fn(() => Promise.resolve(response));
      mocked(createClient).mockReturnValue({
        execute,
      });

      resultPromise = createMiddleware(middlewareOptions)({
        dispatch,
        getState: jest.fn(),
      })(next)(action);
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
  const next = jest.fn(() => action);
  let result: Promise<Json>;
  beforeEach(() => {
    mocked(createClient).mockReturnValue({
      execute: jest.fn(),
    });
    result = createMiddleware(middlewareOptions)({
      dispatch,
      getState: jest.fn(),
      // @ts-ignore
    })(next)(action);
  });

  it('should call `next` with the action', () => {
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should return the result of `next`', () => {
    expect(result).toEqual(action);
  });
});

describe('when the projectKey is not defined', () => {
  const dispatch = jest.fn();
  let action: TSdkAction;
  const next = jest.fn();
  beforeEach(() => {
    mocked(createClient).mockReturnValue({
      execute: jest.fn(),
    });
    action = sdkActions.get({ service: 'productTypes', options: {} });
  });
  it('should throw an error with message containing URI', () => {
    expect(() =>
      createMiddleware({
        getCorrelationId: jest.fn(),
        getProjectKey: () => undefined,
        getAdditionalHeaders: () => ({}),
      })({ dispatch, getState: jest.fn() })(next)(action)
    ).toThrow(
      'Expected projectKey to be defined for action service "productTypes" (method "GET")'
    );
  });
});
