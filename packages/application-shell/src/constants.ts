export const SUPPORTED_HEADERS = {
  ACCEPT_VERSION: 'Accept-version',
  X_APPLICATION_ID: 'X-Application-Id',
  X_CORRELATION_ID: 'X-Correlation-Id',
  X_FEATURE_FLAG: 'X-Feature-Flag',
  X_FORWARD_TO: 'X-Forward-To',
  X_GRAPHQL_TARGET: 'X-Graphql-Target',
  X_GRAPHQL_OPERATION_NAME: 'X-Graphql-Operation-Name',
  X_PROJECT_KEY: 'X-Project-Key',
  X_TEAM_ID: 'X-Team-Id',
  X_TOKEN_RETRY: 'X-Force-Token',
} as const;

export const CONTAINERS = {
  LOCALE_SWITCHER: 'locale-switcher-container',
} as const;
export const STORAGE_KEYS = {
  NONCE: 'nonce',
  IS_AUTHENTICATED: 'isAuthenticated',
  ACTIVE_PROJECT_KEY: 'activeProjectKey',
  ACTIVE_TEAM_ID: 'activeTeamId',
  SELECTED_DATA_LOCALE: 'selectedDataLocale',
  IS_FORCED_MENU_OPEN: 'isForcedMenuOpen',
  LOGIN_STRATEGY: 'loginStrategy',
} as const;
export const SUSPENSION_REASONS = {
  TEMPORARY_MAINTENANCE: 'TemporaryMaintenance',
  PAYMENT: 'Payment',
  OTHER: 'Other',
} as const;

// SSO
export const ORGANIZATION_GENERAL_ERROR = 'organizationGeneralError';
export const LOGIN_STRATEGY_DEFAULT = 'default';
export const LOGIN_STRATEGY_SSO = 'sso';
