import { deepEqual } from 'fast-equals';
import type { Action, Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';
import type { TSdkAction, Json } from '../types';

/**
 * START -->
 * Remove once `@commercetools/sdk-client` exposes proper types.
 */
export type Headers = { [key: string]: string };
export type MethodType =
  | 'GET'
  | 'POST'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'PUT'
  | 'PATCH'
  | 'TRACE';
export type ClientRequest = {
  uri: string;
  method: MethodType;
  body?: unknown;
  headers?: Headers;
};
export type HttpErrorType = {
  name: string;
  message: string;
  code: number;
  status: number;
  statusCode: number;
  originalRequest: ClientRequest;
  body?: Json;
  headers?: Headers;
};
/* <-- END */

interface TSdkMockBase {
  action: TSdkAction;
}
interface TSdkMockSuccess extends TSdkMockBase {
  response: Json;
}
interface TSdkMockFailure extends TSdkMockBase {
  error: HttpErrorType;
}
export type TSdkMock = TSdkMockSuccess | TSdkMockFailure;

const serialize = (data: unknown) => {
  const undefinedPlaceholder = uuid();
  const placeholderRegexp = new RegExp(`"${undefinedPlaceholder}"`, 'g');
  const mapUndefinedValues = (_k: string, v: unknown) =>
    v === undefined ? undefinedPlaceholder : v;
  const withPlaceholders = JSON.stringify(data, mapUndefinedValues, 2);
  return withPlaceholders.replace(placeholderRegexp, 'undefined');
};

const throwIfNoMocksArePassed = (mocks: TSdkMock[]) => {
  if (!mocks || !Array.isArray(mocks) || mocks.length === 0) {
    throw new Error(
      'Missing or invalid argument for `mocks`. Expected an array of mocked actions.'
    );
  }
};

const isSdkAction = (action: Action): action is TSdkAction =>
  action.type === 'SDK';
const isSdkMockSuccess = (mock: TSdkMock): mock is TSdkMockSuccess =>
  (mock as TSdkMockSuccess).response !== undefined;

const createTestMiddleware = (mocks: TSdkMock[]) => {
  throwIfNoMocksArePassed(mocks);

  // We clone the mocks so we can keep the user-provided mocks around for
  // the debugging message. The mocksStack gets mutated, while mocks
  // should never be mutated.
  const mocksStack = [...mocks];
  return () => (next: Dispatch<TSdkAction>) => (action: TSdkAction) => {
    if (!isSdkAction(action)) {
      return next(action);
    }

    const index = mocksStack.findIndex((item) =>
      deepEqual(item.action, action)
    );

    if (index === -1)
      throw new Error(
        `Could not find any more mocks for action ${serialize(
          action
        )} in ${serialize(mocks)}`
      );

    const mock = mocksStack[index];

    // Mocks should only be used once, so we remove it from the stack.
    mocksStack.splice(index, 1);

    return isSdkMockSuccess(mock)
      ? Promise.resolve(mock.response)
      : Promise.reject(mock.error);
  };
};

// eslint-disable-next-line import/prefer-default-export
export { createTestMiddleware };
