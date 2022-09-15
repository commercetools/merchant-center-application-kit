import type { ApplicationOidcForDevelopmentConfig } from '@commercetools-frontend/constants';

import { OIDC_CLAIMS } from '../constants';

type BuilOidcScopeOptions = {
  projectKey?: ApplicationOidcForDevelopmentConfig['initialProjectKey'];
  oAuthScopes?: ApplicationOidcForDevelopmentConfig['oAuthScopes'];
  additionalOAuthScopes?: ApplicationOidcForDevelopmentConfig['additionalOAuthScopes'];
  teamId?: ApplicationOidcForDevelopmentConfig['teamId'];
};

const buildOidcScope = (options: BuilOidcScopeOptions): string => {
  const claims = [];

  // Set the projectKey
  if (options.projectKey) {
    claims.push(`${OIDC_CLAIMS.PROJECT_KEY}:${options.projectKey}`);
  }

  // Set the OAuth Scopes
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
  // Set additional OAuth scopes
  if (options?.additionalOAuthScopes) {
    options.additionalOAuthScopes.forEach((additionalOAuthScope) => {
      claims.push(
        ...(additionalOAuthScope.view ?? []).map(
          (viewOAuthScope) =>
            `view/${additionalOAuthScope.name}:${viewOAuthScope}`
        ),
        ...(additionalOAuthScope.manage ?? []).map(
          (manageOAuthScope) =>
            `manage/${additionalOAuthScope.name}:${manageOAuthScope}`
        )
      );
    });
  }

  // Set the teamId
  if (options.teamId) {
    claims.push(`${OIDC_CLAIMS.TEAM_ID}:${options.teamId}`);
  }

  return [
    // This is required as per OIDC spec.
    OIDC_CLAIMS.OPEN_ID,
    // Custom claims
    ...claims,
  ].join(' ');
};

export { buildOidcScope };
