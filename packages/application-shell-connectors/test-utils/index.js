'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _Object$defineProperty = require('@babel/runtime-corejs3/core-js-stable/object/define-property');
var _Object$defineProperties = require('@babel/runtime-corejs3/core-js-stable/object/define-properties');
var _Object$getOwnPropertyDescriptors = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors');
var _forEachInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/for-each');
var _Object$getOwnPropertyDescriptor = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var _Object$getOwnPropertySymbols = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols');
var _Object$keys = require('@babel/runtime-corejs3/core-js-stable/object/keys');
var _defineProperty = require('@babel/runtime-corejs3/helpers/defineProperty');
var constants = require('@commercetools-frontend/constants');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Object$defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_Object$defineProperty);
var _Object$defineProperties__default = /*#__PURE__*/_interopDefaultLegacy(_Object$defineProperties);
var _Object$getOwnPropertyDescriptors__default = /*#__PURE__*/_interopDefaultLegacy(_Object$getOwnPropertyDescriptors);
var _forEachInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_forEachInstanceProperty);
var _Object$getOwnPropertyDescriptor__default = /*#__PURE__*/_interopDefaultLegacy(_Object$getOwnPropertyDescriptor);
var _filterInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_filterInstanceProperty);
var _Object$getOwnPropertySymbols__default = /*#__PURE__*/_interopDefaultLegacy(_Object$getOwnPropertySymbols);
var _Object$keys__default = /*#__PURE__*/_interopDefaultLegacy(_Object$keys);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = _Object$keys__default['default'](object); if (_Object$getOwnPropertySymbols__default['default']) { var symbols = _Object$getOwnPropertySymbols__default['default'](object); if (enumerableOnly) symbols = _filterInstanceProperty__default['default'](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default['default'](object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; _forEachInstanceProperty__default['default'](_context = ownKeys(Object(source), true)).call(_context, function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors__default['default']) { _Object$defineProperties__default['default'](target, _Object$getOwnPropertyDescriptors__default['default'](source)); } else { var _context2; _forEachInstanceProperty__default['default'](_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty__default['default'](target, key, _Object$getOwnPropertyDescriptor__default['default'](source, key)); }); } } return target; }
var FetchProjectExtensionImageRegex = { kind: "Document", definitions: [{ kind: "OperationDefinition", operation: "query", name: { kind: "Name", value: "FetchProjectExtensionImageRegex" }, variableDefinitions: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "projectExtension" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "imageRegex" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "thumb" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ImageRegex" }, directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "small" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ImageRegex" }, directives: [] }] } }] } }] } }] } }, { kind: "FragmentDefinition", name: { kind: "Name", value: "ImageRegex" }, typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ImageRegexOptions" } }, directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "flag" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "search" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "replace" }, arguments: [], directives: [] }] } }], loc: { start: 0, end: 256, source: { body: "query FetchProjectExtensionImageRegex {\n  projectExtension {\n    id\n    imageRegex {\n      thumb {\n        ...ImageRegex\n      }\n      small {\n        ...ImageRegex\n      }\n    }\n  }\n}\nfragment ImageRegex on ImageRegexOptions {\n  flag\n  search\n  replace\n}\n", name: "GraphQL request", locationOffset: { line: 1, column: 1 } } } };
var createGraphqlResponseForProjectExtensionImageRegexQuery = function createGraphqlResponseForProjectExtensionImageRegexQuery() {
  var customResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    projectExtension: {
      __typename: 'ProjectExtension',
      id: 'project-extension-id',
      imageRegex: {
        __typename: 'ImageRegex',
        thumb: {
          __typename: 'ImageRegexOptions',
          flag: 'gi',
          replace: '-thumb.jpg',
          search: '.[^.]+$'
        },
        small: {
          __typename: 'ImageRegexOptions',
          flag: 'gi',
          replace: '-small.jpg',
          search: '.[^.]+$'
        }
      }
    }
  }, customResponse);
};
var createFetchProjectExtensionImageRegexMock = function createFetchProjectExtensionImageRegexMock() {
  var customMock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    request: {
      query: FetchProjectExtensionImageRegex,
      context: {
        target: constants.GRAPHQL_TARGETS.SETTINGS_SERVICE
      }
    },
    result: {
      data: createGraphqlResponseForProjectExtensionImageRegexQuery()
    }
  }, customMock);
};

exports.createFetchProjectExtensionImageRegexMock = createFetchProjectExtensionImageRegexMock;
exports.createGraphqlResponseForProjectExtensionImageRegexQuery = createGraphqlResponseForProjectExtensionImageRegexQuery;
