import clientMock from 'core/utils/node-sdk';
import middleware from './middleware';

jest.mock('core/utils/node-sdk', () => ({}));

const createServiceMock = result => ({
  withHeader: jest.fn(),
  withCredentials: jest.fn(),
  where: jest.fn(),
  perPage: jest.fn(),
  sort: jest.fn(),
  fetch: jest.fn(() => Promise.resolve(result)),
  update: jest.fn(() => Promise.resolve(result)),
});

describe('when the action is of type SDK', () => {
  describe('no matter the method', () => {
    const globalAppState = { token: 'foo', currentProjectKey: 'bar' };
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
      clientMock.productTypes = createServiceMock(response);
      resultPromise = middleware({ dispatch, getState })(next)(action);
    });

    it('should set a token on the service', () => {
      expect(clientMock.productTypes.withHeader).toHaveBeenCalledWith(
        'Authorization',
        globalAppState.token
      );
    });

    it('should set credentials on the service', () => {
      expect(clientMock.productTypes.withCredentials).toHaveBeenCalledWith({
        projectKey: globalAppState.currentProjectKey,
      });
    });

    it('should not call `next`', () => {
      expect(next).toHaveBeenCalledTimes(0);
    });

    it('should return a promise', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });
  });

  describe('when the method is "fetch"', () => {
    const globalAppState = {};
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
      clientMock.productTypes = createServiceMock(response);
      resultPromise = middleware({ dispatch, getState })(next)(action);
    });

    it('should return the result the fetch', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });
    it('should call "service.fetch"', () => {
      expect(clientMock.productTypes.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the method is "update"', () => {
    const globalAppState = {};
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ globalAppState }));
    const action = {
      type: 'SDK',
      payload: { service: 'productTypes', method: 'update' },
    };
    const next = jest.fn();
    const response = { body: 'foo' };
    let resultPromise;
    beforeEach(() => {
      clientMock.productTypes = createServiceMock(response);
      resultPromise = middleware({ dispatch, getState })(next)(action);
    });

    it('should return the result the update', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
    });
    it('should call "service.update"', () => {
      expect(clientMock.productTypes.update).toHaveBeenCalledTimes(1);
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
