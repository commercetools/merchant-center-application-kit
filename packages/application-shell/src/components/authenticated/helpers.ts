import type { ApplicationWindow } from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

export const buildOidcScope = (options: { projectKey: string }): string =>
  [
    // This is required as per OIDC spec.
    'openid',
    // Custom claims
    `project_key:${options.projectKey}`,
    ...(window.app.__DEVELOPMENT__?.permissions?.view || []).map(
      (scope) => `view:${scope}`
    ),
    ...(window.app.__DEVELOPMENT__?.permissions?.manage || []).map(
      (scope) => `manage:${scope}`
    ),
  ].join(' ');
