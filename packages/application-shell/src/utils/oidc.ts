import type { ApplicationOidcForDevelopmentConfig } from '@commercetools-frontend/constants';

import { OIDC_CLAIMS } from '../constants';

type BuilOidcScopeOptions = {
  projectKey?: ApplicationOidcForDevelopmentConfig['initialProjectKey'];
  oAuthScopes?: ApplicationOidcForDevelopmentConfig['oAuthScopes'];
  teamId?: ApplicationOidcForDevelopmentConfig['teamId'];
};

const buildOidcScope = (options: BuilOidcScopeOptions): string => {
  const claims = [];
  if (options.projectKey) {
    claims.push(`${OIDC_CLAIMS.PROJECT_KEY}:${options.projectKey}`);
    claims.push(
      ...(options.oAuthScopes?.view ?? []).map(
        (scope) => `${OIDC_CLAIMS.VIEW}:${scope}`
      )
    );
    claims.push(
      ...(options.oAuthScopes?.manage ?? []).map(
        (scope) => `${OIDC_CLAIMS.MANAGE}:${scope}`
      )
    );
  }
  const teamId = options.teamId;
  if (teamId) {
    claims.push(`${OIDC_CLAIMS.TEAM_ID}:${teamId}`);
  }
  return [
    // This is required as per OIDC spec.
    OIDC_CLAIMS.OPEN_ID,
    // Custom claims
    ...claims,
  ].join(' ');
};

export { buildOidcScope };
