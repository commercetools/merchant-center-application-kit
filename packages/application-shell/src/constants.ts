export const DIMENSIONS = {
  header: '56px',
  headerItemDivider: '24px',
  navMenu: '64px',
  navMenuExpanded: '245px',
  navMenuItemHeight: '48px',
  newNavMenu: '80px',
  newNavMenuExpanded: '256px',
  subMenuItemVerticalOffset: 48,
} as const;

export const WINDOW_SIZES = {
  NARROW: 918,
  STANDARD: 1024,
  WIDE: 1200,
} as const;

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

export const CONTAINERS = {
  LOCALE_SWITCHER: 'locale-switcher-container',
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
export const SUSPENSION_REASONS = {
  TEMPORARY_MAINTENANCE: 'TemporaryMaintenance',
  PAYMENT: 'Payment',
  OTHER: 'Other',
} as const;

// SSO
export const ORGANIZATION_GENERAL_ERROR = 'organizationGeneralError';
export const LOGIN_STRATEGY_DEFAULT = 'default';
export const LOGIN_STRATEGY_OIDC = 'oidc';
export const LOGIN_STRATEGY_SSO = 'sso';

// OIDC params
export const OIDC_RESPONSE_TYPES = { ID_TOKEN: 'id_token' };
export const OIDC_CLAIMS = {
  OPEN_ID: 'openid',
  PROJECT_KEY: 'project_key',
  TEAM_ID: 'team_id',
  APPLICATION_ID: 'application_id',
  VIEW: 'view',
  MANAGE: 'manage',
};
