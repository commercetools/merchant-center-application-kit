import { getErrorByCode } from '@commercetools/sdk-middleware-http';
import * as sdkActions from '../actions';
import type { TSdkAction, Json } from '../types';
import { createTestMiddleware } from './test-utils';

type FakeStore = {
  dispatch: (action: TSdkAction) => Promise<Json>;
  next: jest.Mock;
};

const createTestStore = (
  middleware: ReturnType<typeof createTestMiddleware>
): FakeStore => {
  const next = jest.fn();
  return {
    dispatch: (action: TSdkAction) => middleware()(next)(action),
    next,
  };
};

describe('createTestMiddleware', () => {
  describe('validation', () => {
    it('when mocks argument is not provided', () => {
      // @ts-ignore
      expect(() => createTestMiddleware()).toThrow(
        /Missing or invalid argument for `mocks`. Expected an array of mocked actions/
      );
    });
    it('when mocks argument is not an array', () => {
      // @ts-ignore
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
    let store: FakeStore;
    beforeEach(() => {
      const testMiddleware = createTestMiddleware([
        { action: sdkActions.get({ uri: '/foo/1' }), response: { ok: true } },
      ]);
      store = createTestStore(testMiddleware);
      // @ts-ignore
      store.dispatch({ type: 'foo' });
    });
    it('should call next', () => {
      expect(store.next).toHaveBeenCalled();
    });
  });
  describe('when mocks do not match any action', () => {
    let store: FakeStore;
    beforeEach(() => {
      const testMiddleware = createTestMiddleware([
        { action: sdkActions.get({ uri: '/foo/1' }), response: { ok: true } },
      ]);
      store = createTestStore(testMiddleware);
    });
    it('should throw an error', () => {
      expect(() => {
        store.dispatch({
          type: 'SDK',
          payload: {
            method: 'GET',
            uri: '/foo/2',
          },
        });
      }).toThrow(/Could not find any more mocks for action/);

      expect(store.next).not.toHaveBeenCalled();
    });

    describe('formatting error message', () => {
      beforeEach(() => {
        const testMiddleware = createTestMiddleware([
          {
            action: sdkActions.post({
              uri: '/foo',
              payload: { foo: undefined },
            }),
            response: { ok: true },
          },
        ]);
        store = createTestStore(testMiddleware);
      });

      it('should not hide fields holding value `undefined`', () => {
        expect(() => {
          store.dispatch({
            type: 'SDK',
            payload: {
              uri: '/foo',
              method: 'POST',
              payload: {
                bar: undefined,
              },
            },
          });
        }).toThrow(
          `Could not find any more mocks for action {
  "type": "SDK",
  "payload": {
    "uri": "/foo",
    "method": "POST",
    "payload": {
      "bar": undefined
    }
  }
} in [
  {
    "action": {
      "type": "SDK",
      "payload": {
        "uri": "/foo",
        "payload": {
          "foo": undefined
        },
        "method": "POST"
      }
    },
    "response": {
      "ok": true
    }
  }
]`
        );
      });
    });
  });
  describe('when mocks match an action', () => {
    describe('action should be resolved', () => {
      let store: FakeStore;
      beforeEach(() => {
        const testMiddleware = createTestMiddleware([
          // @ts-ignore
          { action: { type: 'another-action' } },
          {
            action: sdkActions.get({ uri: '/foo/1' }),
            response: { foo: 'bar' },
          },
          {
            action: sdkActions.post({
              uri: '/foo',
              payload: JSON.stringify({ foo: 'bar' }),
            }),
            response: { foo: 'bar' },
          },
        ]);
        store = createTestStore(testMiddleware);
      });
      it('resolves promise', () =>
        expect(
          store.dispatch(sdkActions.get({ uri: '/foo/1' }))
        ).resolves.toEqual({ foo: 'bar' }));
    });
    describe('action should be rejected', () => {
      let store: FakeStore;
      beforeEach(() => {
        const BadRequestError = getErrorByCode(400);
        const error = new BadRequestError('Invalid parameter');
        const testMiddleware = createTestMiddleware([
          // @ts-ignore
          { action: { type: 'another-action' } },
          {
            action: sdkActions.get({ uri: '/foo/1' }),
            error,
          },
          {
            action: sdkActions.post({
              uri: '/foo',
              payload: JSON.stringify({ foo: 'bar' }),
            }),
            response: { foo: 'bar' },
          },
        ]);
        store = createTestStore(testMiddleware);
      });
      it('rejects promise', () =>
        expect(
          store.dispatch(sdkActions.get({ uri: '/foo/1' }))
        ).rejects.toEqual(
          expect.objectContaining({ message: 'Invalid parameter' })
        ));
    });
  });
});
