import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; _forEachInstanceProperty(_context = ownKeys(Object(source), true)).call(_context, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
        target: GRAPHQL_TARGETS.SETTINGS_SERVICE
      }
    },
    result: {
      data: createGraphqlResponseForProjectExtensionImageRegexQuery()
    }
  }, customMock);
};

export { createFetchProjectExtensionImageRegexMock, createGraphqlResponseForProjectExtensionImageRegexQuery };
