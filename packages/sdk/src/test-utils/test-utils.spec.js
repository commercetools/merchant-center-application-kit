import { createTestMiddleware } from './test-utils';

const createTestStore = middleware => {
  const next = jest.fn();
  return {
    dispatch: action => middleware()(next)(action),
    next,
  };
};

describe('createTestMiddleware', () => {
  describe('validation', () => {
    it('when mocks argument is not provided', () => {
      expect(() => createTestMiddleware()).toThrow(
        /Missing or invalid argument for `mocks`. Expected an array of mocked actions/
      );
    });
    it('when mocks argument is not an array', () => {
      expect(() => createTestMiddleware('foo')).toThrow(
        /Missing or invalid argument for `mocks`. Expected an array of mocked actions/
      );
    });
    it('when mocks argument is an empty array', () => {
      expect(() => createTestMiddleware([])).toThrow(
        /Missing or invalid argument for `mocks`. Expected an array of mocked actions/
      );
    });
  });
  describe('when action is not for SDK', () => {
    let store;
    beforeEach(() => {
      const testMiddleware = createTestMiddleware([
        { action: { type: 'SDK' } },
      ]);
      store = createTestStore(testMiddleware);
      store.dispatch({ type: 'foo' });
    });
    it('should call next', () => {
      expect(store.next).toHaveBeenCalled();
    });
  });
  describe('when mocks do not match any action', () => {
    let store;
    beforeEach(() => {
      const testMiddleware = createTestMiddleware([
        { action: { type: 'SDK' }, response: { ok: true } },
      ]);
      store = createTestStore(testMiddleware);
    });
    it('should throw an error', () => {
      expect(() => {
        store.dispatch({
          type: 'SDK',
          payload: {
            method: 'GET',
            uri: '/foo/bar',
            headers: {
              Authorization: 'foo-bar',
            },
          },
        });
      }).toThrow(/Could not find any more mocks for action/);
    });
    it('should not call next', () => {
      expect(store.next).not.toHaveBeenCalled();
    });
  });
  describe('when mocks match an action', () => {
    describe('action should be resolved', () => {
      let store;
      beforeEach(() => {
        const testMiddleware = createTestMiddleware([
          {
            action: {
              type: 'another-action',
            },
          },
          {
            action: {
              type: 'SDK',
              payload: {
                method: 'POST',
                uri: '/foo/bar',
                body: JSON.stringify({ foo: 'bar' }),
              },
            },
            response: { foo: 'bar' },
          },
          {
            action: {
              type: 'SDK',
              payload: {
                method: 'GET',
                uri: '/foo/bar',
                headers: {
                  Authorization: 'foo-bar',
                },
              },
            },
            response: { ok: true },
          },
        ]);
        store = createTestStore(testMiddleware);
      });
      it('resolves promise', () =>
        expect(
          store.dispatch({
            type: 'SDK',
            payload: {
              method: 'GET',
              uri: '/foo/bar',
              headers: {
                Authorization: 'foo-bar',
              },
            },
          })
        ).resolves.toEqual({ ok: true }));
    });
    describe('action should be rejected', () => {
      let store;
      beforeEach(() => {
        const testMiddleware = createTestMiddleware([
          {
            action: {
              type: 'another-action',
            },
          },
          {
            action: {
              type: 'SDK',
              payload: {
                method: 'POST',
                uri: '/foo/bar',
                body: JSON.stringify({ foo: 'bar' }),
              },
            },
            response: { foo: 'bar' },
          },
          {
            action: {
              type: 'SDK',
              payload: {
                method: 'GET',
                uri: '/foo/bar',
                headers: {
                  Authorization: 'foo-bar',
                },
              },
            },
            error: { message: 'not valid' },
          },
        ]);
        store = createTestStore(testMiddleware);
      });
      it('rejects promise', () =>
        expect(
          store.dispatch({
            type: 'SDK',
            payload: {
              method: 'GET',
              uri: '/foo/bar',
              headers: {
                Authorization: 'foo-bar',
              },
            },
          })
        ).rejects.toEqual({ message: 'not valid' }));
    });
  });
});
