// eslint-disable-next-line import/prefer-default-export
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
