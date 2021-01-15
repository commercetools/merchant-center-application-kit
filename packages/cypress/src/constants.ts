// TODO: this is copied from the `application-shell` package.
// Find a way to expose those, or extract them into a shared place.

export const OIDC_RESPONSE_TYPES = { ID_TOKEN: 'id_token' };

export const OIDC_CLAIMS = {
  OPEN_ID: 'openid',
  PROJECT_KEY: 'project_key',
  TEAM_ID: 'team_id',
  VIEW: 'view',
  MANAGE: 'manage',
};

export const STORAGE_KEYS = {
  NONCE: 'nonce',
  SESSION_SCOPE: 'sessionScope',
  ACTIVE_PROJECT_KEY: 'activeProjectKey',
} as const;
