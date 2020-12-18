import type { ApplicationWindow } from '@commercetools-frontend/constants';

import { OIDC_CLAIMS } from '../../constants';

declare let window: ApplicationWindow;

export const buildOidcScope = (options: {
  projectKey?: string | null;
}): string => {
  const projectClaims = [];
  if (options.projectKey) {
    projectClaims.push(`${OIDC_CLAIMS.PROJECT_KEY}:${options.projectKey}`);
    projectClaims.push(
      ...(window.app.__DEVELOPMENT__?.permissions?.view ?? []).map(
        (scope) => `${OIDC_CLAIMS.VIEW}:${scope}`
      )
    );
    projectClaims.push(
      ...(window.app.__DEVELOPMENT__?.permissions?.manage ?? []).map(
        (scope) => `${OIDC_CLAIMS.MANAGE}:${scope}`
      )
    );
  }
  return [
    // This is required as per OIDC spec.
    OIDC_CLAIMS.OPEN_ID,
    // Custom claims
    ...projectClaims,
  ].join(' ');
};
