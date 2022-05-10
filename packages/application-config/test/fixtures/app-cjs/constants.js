const {
  entryPointUriPathToPermissionKeys,
} = require('@commercetools-frontend/application-shell/ssr');

const entryPointUriPath = 'test';

exports.entryPointUriPath = entryPointUriPath;
exports.PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);
