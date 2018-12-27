import { deepEqual } from 'fast-equals';

const serialize = data =>
  JSON.stringify(data, (k, v) => (v === undefined ? null : v), 2);

const throwIfNoMocksArePassed = mocks => {
  if (!mocks || !Array.isArray(mocks) || mocks.length === 0) {
    throw new Error(
      'Missing or invalid argument for `mocks`. Expected an array of mocked actions.'
    );
  }
};

const createTestMiddleware = mocks => {
  throwIfNoMocksArePassed(mocks);

  // We clone the mocks so we can keep the user-provided mocks around for
  // the debugging message. The mocksStack gets mutated, while mocks
  // should never be mutated.
  const mocksStack = [...mocks];
  return () => next => action => {
    // respond to fetch calls
    if (action && action.type === 'SDK') {
      const index = mocksStack.findIndex(item =>
        deepEqual(item.action, action)
      );

      if (index === -1)
        throw new Error(
          `Could not find any more mocks for action ${serialize(
            action
          )} in ${serialize(mocks)}`
        );

      const { response, error } = mocksStack[index];

      // Mocks should only be used once, so we remove it from the stack.
      mocksStack.splice(index, 1);

      return error ? Promise.reject(error) : Promise.resolve(response);
    }

    return next(action);
  };
};

// eslint-disable-next-line import/prefer-default-export
export { createTestMiddleware };
