'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _Promise = require('@babel/runtime-corejs3/core-js-stable/promise');
var _spliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/splice');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _findIndexInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/find-index');
var _toConsumableArray = require('@babel/runtime-corejs3/helpers/toConsumableArray');
var _Array$isArray = require('@babel/runtime-corejs3/core-js-stable/array/is-array');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');
var fastEquals = require('fast-equals');
var uuid = require('uuid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Promise__default = /*#__PURE__*/_interopDefaultLegacy(_Promise);
var _spliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_spliceInstanceProperty);
var _concatInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_concatInstanceProperty);
var _findIndexInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_findIndexInstanceProperty);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _Array$isArray__default = /*#__PURE__*/_interopDefaultLegacy(_Array$isArray);
var _JSON$stringify__default = /*#__PURE__*/_interopDefaultLegacy(_JSON$stringify);

var serialize = function serialize(data) {
  var undefinedPlaceholder = uuid.v4();
  var placeholderRegexp = new RegExp("\"".concat(undefinedPlaceholder, "\""), 'g');

  var mapUndefinedValues = function mapUndefinedValues(_k, v) {
    return v === undefined ? undefinedPlaceholder : v;
  };

  var withPlaceholders = _JSON$stringify__default['default'](data, mapUndefinedValues, 2);

  return withPlaceholders.replace(placeholderRegexp, 'undefined');
};

var throwIfNoMocksArePassed = function throwIfNoMocksArePassed(mocks) {
  if (!mocks || !_Array$isArray__default['default'](mocks) || mocks.length === 0) {
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

  var mocksStack = _toConsumableArray__default['default'](mocks);

  return function () {
    return function (next) {
      return function (action) {
        var _context;

        if (!isSdkAction(action)) {
          return next(action);
        }

        var index = _findIndexInstanceProperty__default['default'](mocksStack).call(mocksStack, function (item) {
          return fastEquals.deepEqual(item.action, action);
        });

        if (index === -1) throw new Error(_concatInstanceProperty__default['default'](_context = "Could not find any more mocks for action ".concat(serialize(action), " in ")).call(_context, serialize(mocks)));
        var mock = mocksStack[index]; // Mocks should only be used once, so we remove it from the stack.

        _spliceInstanceProperty__default['default'](mocksStack).call(mocksStack, index, 1);

        return isSdkMockSuccess(mock) ? _Promise__default['default'].resolve(mock.response) : _Promise__default['default'].reject(mock.error);
      };
    };
  };
}; // eslint-disable-next-line import/prefer-default-export

exports.createTestMiddleware = createTestMiddleware;
