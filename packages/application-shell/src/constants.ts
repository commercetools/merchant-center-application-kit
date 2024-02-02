export const DIMENSIONS = {
  header: '56px',
} as const;

export const NAVBAR = {
  expanderHeight: '50px',
  expanderSize: '40px',
  iconSize: '24px',
  iconSizeHover: '28px',
  itemSize: '48px',
  itemHeight: '56px',
  sublistIndentationWhenCollapsed: '72px',
  sublistIndentationWhenExpanded: '248px',
  sublistWidth: '253px',
  leftNavigationTransition: 'all 150ms cubic-bezier(1, 0, 0.58, 1)',
  widthLeftNavigation: '80px',
  widthLeftNavigationWhenExpanded: '256px',
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
