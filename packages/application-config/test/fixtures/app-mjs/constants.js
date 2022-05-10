import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

export const entryPointUriPath = 'test';
export const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);
