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

    it('should not call `next`', () => {
      expect(next).toHaveBeenCalledTimes(0);
    });

    it('should return a promise', async () => {
      await expect(resultPromise).resolves.toBe(response.body);
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
