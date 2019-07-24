// DOM elements
export const PORTALS_CONTAINER_ID = 'portals-container';

// Links
export const SUPPORT_PORTAL_URL =
  'https://jira.commercetools.com/servicedesk/customer/portal/1/create/167';

// Notification actions
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const HIDE_ALL_PAGE_NOTIFICATIONS = 'HIDE_ALL_PAGE_NOTIFICATIONS';

// Notifications
export type TAppNotificationDomain = 'global' | 'page' | 'side';
export const DOMAINS: {
  [key: string]: TAppNotificationDomain;
} = {
  GLOBAL: 'global',
  PAGE: 'page',
  SIDE: 'side',
};

export type TAppNotificationKind =
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'api-error'
  | 'unexpected-error';
export type TAppNotificationKindSide = Omit<
  TAppNotificationKind,
  'api-error' | 'unexpected-error'
>;
export type TAppNotificationKindGlobal = Omit<
  TAppNotificationKind,
  'unexpected-error'
>;
export type TAppNotificationKindPage = TAppNotificationKind;
export type TAppNotificationOfDomain = { domain: TAppNotificationDomain };
export type TAppNotificationOfKind<
  T extends TAppNotificationOfDomain
> = TAppNotificationOfDomain & {
  // Conditionally check the shape based on other values
  kind: 'global' extends T['domain']
    ? TAppNotificationKindGlobal
    : 'page' extends T['domain']
    ? TAppNotificationKindPage
    : 'side' extends T['domain']
    ? TAppNotificationKindSide
    : never;
};
export type TAppNotificationApiError = {
  code: string;
  message: string;
};
export type TAppNotificationValuesApiError = {
  errors: TAppNotificationApiError[];
};
export type TAppNotificationValuesUnexpectedError = { errorId?: string };
export type TAppNotification<
  T extends TAppNotificationOfKind<T>
> = TAppNotificationOfKind<T> & {
  // Conditionally check the shape based on other values
  text?: TAppNotificationKindSide extends T['kind'] ? string : never;
  values?: 'api-error' extends T['kind']
    ? TAppNotificationValuesApiError
    : 'unexpected-error' extends T['kind']
    ? TAppNotificationValuesUnexpectedError
    : never;
};
export const NOTIFICATION_KINDS_SIDE: {
  [key: string]: TAppNotificationKindSide;
} = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
};
export const NOTIFICATION_KINDS_GLOBAL: {
  [key: string]: TAppNotificationKindGlobal;
} = {
  ...NOTIFICATION_KINDS_SIDE,
  'unexpected-error': 'unexpected-error',
};
export const NOTIFICATION_KINDS_PAGE: {
  [key: string]: TAppNotificationKindPage;
} = {
  ...NOTIFICATION_KINDS_GLOBAL,
  'api-error': 'api-error',
};

// Fallback string when there is no localized value
export const NO_VALUE_FALLBACK = '- - - -';

// HTTP requests and responses
export type TStatusCode = 401 | 403 | 299 | 404;
export const STATUS_CODES: { [key: string]: TStatusCode } = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNAUTHENTICATED: 299,
  NOT_FOUND: 404,
};

export type TLogoutReasons = 'user' | 'unauthorized' | 'invalid' | 'deleted';
export const LOGOUT_REASONS: { [key: string]: TLogoutReasons } = {
  USER: 'user',
  UNAUTHORIZED: 'unauthorized',
  INVALID: 'invalid',
  DELETED: 'deleted',
};

export type TGraphQLTargets =
  | 'mc'
  | 'ctp'
  | 'dashboard'
  | 'pim-indexer'
  | 'settings'
  | 'administration';
export const GRAPHQL_TARGETS: { [key: string]: TGraphQLTargets } = {
  MERCHANT_CENTER_BACKEND: 'mc',
  COMMERCETOOLS_PLATFORM: 'ctp',
  DASHBOARD_SERVICE: 'dashboard',
  PIM_INDEXER: 'pim-indexer',
  SETTINGS_SERVICE: 'settings',
  ADMINISTRATION_SERVICE: 'administration',
};
