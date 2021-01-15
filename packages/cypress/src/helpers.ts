// TODO: this is copied from the `application-shell` package.
// Find a way to expose those, or extract them into a shared place.

import { OIDC_CLAIMS } from './constants';

type BuilOidcScopeOptions = {
  projectKey?: string | null;
  permissions?: {
    view: string[];
    manage: string[];
  };
  teamId?: string | null;
};

export const buildOidcScope = (options: BuilOidcScopeOptions): string => {
  const projectClaims = [];
  if (options.projectKey) {
    projectClaims.push(`${OIDC_CLAIMS.PROJECT_KEY}:${options.projectKey}`);
    projectClaims.push(
      ...(options.permissions?.view ?? []).map(
        (scope) => `${OIDC_CLAIMS.VIEW}:${scope}`
      )
    );
    projectClaims.push(
      ...(options.permissions?.manage ?? []).map(
        (scope) => `${OIDC_CLAIMS.MANAGE}:${scope}`
      )
    );
  }
  const teamId = options.teamId;
  if (teamId) {
    projectClaims.push(`${OIDC_CLAIMS.TEAM_ID}:${teamId}`);
  }
  return [
    // This is required as per OIDC spec.
    OIDC_CLAIMS.OPEN_ID,
    // Custom claims
    ...projectClaims,
  ].join(' ');
};
