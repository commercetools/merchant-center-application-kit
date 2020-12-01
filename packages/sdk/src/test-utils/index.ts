import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import { deepEqual } from 'fast-equals';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _JSON$stringify from '@babel/runtime-corejs3/core-js-stable/json/stringify';
import { v4 } from 'uuid';

var serialize = function serialize(data) {
  var undefinedPlaceholder = v4();
  var placeholderRegexp = new RegExp("\"".concat(undefinedPlaceholder, "\""), 'g');

  var mapUndefinedValues = function mapUndefinedValues(_k, v) {
    return v === undefined ? undefinedPlaceholder : v;
  };

  var withPlaceholders = _JSON$stringify(data, mapUndefinedValues, 2);

  return withPlaceholders.replace(placeholderRegexp, 'undefined');
};

var throwIfNoMocksArePassed = function throwIfNoMocksArePassed(mocks) {
  if (!mocks || !_Array$isArray(mocks) || mocks.length === 0) {
    throw new Error('Missing or invalid argument for `mocks`. Expected an array of mocked actions.');
  }
};

var isSdkAction = function isSdkAction(action) {
  return action.type === 'SDK';
};

var isSdkMockSuccess = function isSdkMockSuccess(mock) {
  return mock.response !== undefined;
};

var createTestMiddleware = function createTestMiddleware(mocks) {
  throwIfNoMocksArePassed(mocks); // We clone the mocks so we can keep the user-provided mocks around for
  // the debugging message. The mocksStack gets mutated, while mocks
  // should never be mutated.

  var mocksStack = _toConsumableArray(mocks);

  return function () {
    return function (next) {
      return function (action) {
        var _context;

        if (!isSdkAction(action)) {
          return next(action);
        }

        var index = _findIndexInstanceProperty(mocksStack).call(mocksStack, function (item) {
          return deepEqual(item.action, action);
        });

        if (index === -1) throw new Error(_concatInstanceProperty(_context = "Could not find any more mocks for action ".concat(serialize(action), " in ")).call(_context, serialize(mocks)));
        var mock = mocksStack[index]; // Mocks should only be used once, so we remove it from the stack.

        _spliceInstanceProperty(mocksStack).call(mocksStack, index, 1);

        return isSdkMockSuccess(mock) ? _Promise.resolve(mock.response) : _Promise.reject(mock.error);
      };
    };
  };
}; // eslint-disable-next-line import/prefer-default-export

export { createTestMiddleware };
