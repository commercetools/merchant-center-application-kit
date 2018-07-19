import snakeCase from 'lodash.snakecase';
import * as permissionKeys from '../constants';

// eslint-disable-next-line import/prefer-default-export
export function toPermissionShape(permissionKey) {
  if (typeof permissionKey !== 'string') {
    throw new Error(
      `Expected argument "${permissionKey}" to be a string but got ${typeof permissionKey}.`
    );
  }
  if (!permissionKeys[permissionKey]) {
    throw new Error(
      `Expected argument "${permissionKey}" to be one of "${Object.keys(
        permissionKeys
      ).join(',')}".`
    );
  }
  // Transform to snakecase so that we can split by `_`
  const parts = snakeCase(permissionKey).split('_');
  return {
    mode: parts[0],
    resource: parts[1],
  };
}
