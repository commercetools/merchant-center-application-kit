export const DIMENSIONS = {
  header: '56px',
  navMenu: '80px',
  navMenuExpanded: '256px',
  navMenuItemHeight: '48px',
} as const;

export const WINDOW_SIZES = {
  STANDARD: 1024,
  WIDE: 1200,
} as const;

export const CONTAINERS = {
  LOCALE_SWITCHER: 'locale-switcher-container',
  LEFT_OF_PROFILE: 'left-of-profile',
} as const;

export const SUSPENSION_REASONS = {
  TEMPORARY_MAINTENANCE: 'TemporaryMaintenance',
  PAYMENT: 'Payment',
  OTHER: 'Other',
} as const;

// OIDC params
export const OIDC_RESPONSE_TYPES = {
  ID_TOKEN: 'id_token',
} as const;
export const OIDC_CLAIMS = {
  OPEN_ID: 'openid',
  PROJECT_KEY: 'project_key',
  TEAM_ID: 'team_id',
  APPLICATION_ID: 'application_id',
  VIEW: 'view',
  MANAGE: 'manage',
} as const;
