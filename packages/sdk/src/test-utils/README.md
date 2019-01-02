# Test Utils

To facilitate testing components that implement action creators, we expose some **test utils**.

> Usually you won't need to use those utils directly, as they are implicitly used by the [`<ApplicationShell>`'s `test-utils`](https://github.com/commercetools/merchant-center-application-kit/tree/master/packages/application-shell/src/test-utils).

## Table of Contents

- [test-utils](#test-utils-1)
  - [API](#api)
    - [createTestMiddleware(mocks: Array<ActionMock>)](#createtestmiddlewaremocks-arrayactionmock)
  - [Examples](#examples)
    - [`createTestMiddleware`](#createtestmiddleware)

## `test-utils`

### API

This section describes the methods exported by `@commercetools-frontend/sdk/test-utils`.

#### `createTestMiddleware(mocks: Array<ActionMock>)`

| Argument | Type    | Concern | Description                                                                                                                                                                                                                                                                                                                                                                            |
| -------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mocks`  | `Array` | Redux   | A mock contains an object with `{ action, response, error }`, where `action` represents the Redux action from the `@commercetools-frontend/sdk` package. The `response` represents the network JSON response and `error` represents a response error. In case `error` is provided, the action will always be rejected with the given error, otherwise the `response` will be returned. |

**Return values**

The `createTestMiddleware` returns a Promise if the action matches one of the provided mocks. The Promise is resolved with the provided `response` or rejected with the provided `error`.

### Examples

#### `createTestMiddleware`

```js
// Mock: action
const action = {
  type: 'SDK',
  payload: {
    method: 'GET',
    uri: '/foo/bar',
    headers: {
      Authorization: 'foo-bar',
    },
  },
};

// Mock: response
const response = {
  ok: true,
};

// Mock: error
const error = {
  statusCode: 400,
  message: 'Invalid parameter foo',
  errors: [
    {
      code: 'InvalidParameter',
      message: 'Invalid parameter foo',
    },
  ],
};

// Resolved mock
const mocks = [{ action, response }];

// Rejected mock
const mocks = [{ action, error }];
```
