const {
  entryPointUriPathToPermissionKeys,
} = require('@commercetools-frontend/application-shell/ssr');

const entryPointUriPath = 'test';
const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);

module.exports = { entryPointUriPath, PERMISSIONS };
