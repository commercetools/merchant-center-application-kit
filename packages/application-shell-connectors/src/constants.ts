export const SUPPORTED_HEADERS = {
  ACCEPT: 'Accept',
  ACCEPT_VERSION: 'Accept-version',
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  X_APPLICATION_ID: 'X-Application-Id',
  X_CUSTOM_VIEW_ID: 'X-Custom-View-Id',
  X_CORRELATION_ID: 'X-Correlation-Id',
  X_FEATURE_FLAG: 'X-Feature-Flag',
  X_FORWARD_TO: 'X-Forward-To',
  X_FORWARD_TO_AUDIENCE_POLICY: 'X-Forward-To-Audience-Policy',
  X_FORWARD_TO_CLAIMS: 'X-Forward-To-Claims',
  X_GRAPHQL_TARGET: 'X-Graphql-Target',
  X_GRAPHQL_OPERATION_NAME: 'X-Graphql-Operation-Name',
  X_PROJECT_KEY: 'X-Project-Key',
  X_TEAM_ID: 'X-Team-Id',
  X_TOKEN_RETRY: 'X-Force-Token',
  X_USER_AGENT: 'X-User-Agent',
} as const;

export const STORAGE_KEYS = {
  NONCE: 'nonce',
  IS_AUTHENTICATED: 'isAuthenticated',
  SESSION_TOKEN: 'sessionToken',
  SESSION_SCOPE: 'sessionScope',
  ACTIVE_PROJECT_KEY: 'activeProjectKey',
  ACTIVE_TEAM_ID: 'activeTeamId',
  SELECTED_DATA_LOCALE: 'selectedDataLocale',
  IS_FORCED_MENU_OPEN: 'isForcedMenuOpen',
  LOGIN_STRATEGY: 'loginStrategy',
} as const;

// SSO
export const ORGANIZATION_GENERAL_ERROR = 'organizationGeneralError';
export const LOGIN_STRATEGY_DEFAULT = 'default';
export const LOGIN_STRATEGY_OIDC = 'oidc';
export const LOGIN_STRATEGY_SSO = 'sso';