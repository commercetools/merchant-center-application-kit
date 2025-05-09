export const STORAGE_KEYS = {
  NONCE: 'nonce',
  SESSION_SCOPE: 'sessionScope',
  ACTIVE_PROJECT_KEY: 'activeProjectKey',
} as const;

export const OIDC_RESPONSE_TYPES = { ID_TOKEN: 'id_token' };

export const HTTP_STATUS_CODES = {
  TOO_MANY_REQUESTS: 429,
} as const;
