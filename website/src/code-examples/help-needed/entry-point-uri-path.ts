// Make sure to import the helper functions from the `ssr` entry point.
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';

declare const window: typeof Window & {
  app: TApplicationContext<{}>['environment'];
};

export const entryPointUriPath =
  typeof window === 'undefined'
    ? process.env.ENTRY_POINT_URI_PATH
    : window.app.entryPointUriPath;

export const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);
