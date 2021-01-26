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
export const NOTIFICATION_DOMAINS = {
  GLOBAL: 'global',
  PAGE: 'page',
  SIDE: 'side',
} as const;
export const NOTIFICATION_KINDS_SIDE = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
} as const;
export const NOTIFICATION_KINDS_GLOBAL = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
  'unexpected-error': 'unexpected-error',
} as const;
export const NOTIFICATION_KINDS_PAGE = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
  'unexpected-error': 'unexpected-error',
  'api-error': 'api-error',
} as const;
export type TAppNotificationDomain = typeof NOTIFICATION_DOMAINS[keyof typeof NOTIFICATION_DOMAINS];
// Alias to `NOTIFICATION_DOMAINS` for backwards compatibility
export const DOMAINS = NOTIFICATION_DOMAINS;

export type TAppNotificationKindSide = typeof NOTIFICATION_KINDS_SIDE[keyof typeof NOTIFICATION_KINDS_SIDE];
export type TAppNotificationKindGlobal = typeof NOTIFICATION_KINDS_GLOBAL[keyof typeof NOTIFICATION_KINDS_GLOBAL];
export type TAppNotificationKindPage = typeof NOTIFICATION_KINDS_PAGE[keyof typeof NOTIFICATION_KINDS_PAGE];
export type TAppNotificationKind =
  | TAppNotificationKindSide
  | TAppNotificationKindGlobal
  | TAppNotificationKindPage;
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
export type TAppNotificationApiError<ExtraFields extends {} = {}> = {
  message: string;
  code?: string;
} & ExtraFields;
export type TAppNotificationValuesApiError<ExtraFields extends {} = {}> = {
  errors: TAppNotificationApiError<ExtraFields>[];
};
export type TAppNotificationValuesUnexpectedError = { errorId?: string };
export type TAppNotification<
  T extends TAppNotificationOfKind<T>
> = TAppNotificationOfKind<T> & {
  id: number;
  // Conditionally check the shape based on other values
  text?: TAppNotificationKindSide extends T['kind'] ? string : never;
  values?: 'api-error' extends T['kind']
    ? TAppNotificationValuesApiError
    : 'unexpected-error' extends T['kind']
    ? TAppNotificationValuesUnexpectedError
    : never;
};
export type TAppNotificationGlobal = TAppNotification<{
  domain: typeof NOTIFICATION_DOMAINS.GLOBAL;
  kind: TAppNotificationKindGlobal;
}>;
export type TAppNotificationPage = TAppNotification<{
  domain: typeof NOTIFICATION_DOMAINS.PAGE;
  kind: TAppNotificationKindPage;
}>;
export type TAppNotificationSide = TAppNotification<{
  domain: typeof NOTIFICATION_DOMAINS.SIDE;
  kind: TAppNotificationKindSide;
}>;

// Fallback string when there is no localized value
export const NO_VALUE_FALLBACK = '- - - -';

// HTTP requests and responses
export const STATUS_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNAUTHENTICATED: 299,
  NOT_FOUND: 404,
} as const;
export type TStatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];

export const LOGOUT_REASONS = {
  USER: 'user',
  UNAUTHORIZED: 'unauthorized',
  INVALID: 'invalid',
  DELETED: 'deleted',
  NO_PROJECTS: 'no-projects',
} as const;
export type TLogoutReason = typeof LOGOUT_REASONS[keyof typeof LOGOUT_REASONS];

export const GRAPHQL_TARGETS = {
  MERCHANT_CENTER_BACKEND: 'mc',
  COMMERCETOOLS_PLATFORM: 'ctp',
  DASHBOARD_SERVICE: 'dashboard',
  CHANGE_HISTORY_SERVICE: 'change-history',
  PIM_INDEXER: 'pim-indexer',
  SETTINGS_SERVICE: 'settings',
  ADMINISTRATION_SERVICE: 'administration',
} as const;
export type TGraphQLTargets = typeof GRAPHQL_TARGETS[keyof typeof GRAPHQL_TARGETS];

export const MC_API_PROXY_TARGETS = {
  COMMERCETOOLS_PLATFORM: 'ctp',
  MACHINE_LEARNING: 'ml',
  PIM_SEARCH: 'pim-search',
  MC_METRICS: 'mc-metrics',
  IMPORT: 'import',
} as const;
export type TMcApiProxyTargets = typeof MC_API_PROXY_TARGETS[keyof typeof MC_API_PROXY_TARGETS];

export type ApplicationOidcForDevelopmentConfig = {
  authorizeUrl: string;
  initialProjectKey?: string;
  teamId?: string;
  oAuthScopes?: {
    view: string[];
    manage: string[];
  };
};

// Global application environment on window object
export interface ApplicationWindow extends Window {
  dataLayer: unknown[];
  app: {
    // TODO: make it required: https://github.com/commercetools/merchant-center-application-kit/issues/1440
    applicationId?: string;
    applicationName: string;
    entryPointUriPath: string;
    revision: string;
    env: string;
    location: string;
    cdnUrl: string;
    mcApiUrl: string;
    frontendHost: string;
    servedByProxy: boolean;
    // Optional properties. To use them, pass them to the `additionalEnv` object of the application config.
    mcProxyApiUrl?: string;
    ldClientSideId?: string;
    trackingSentry?: string;
    trackingGtm?: string;
    enableSignUp?: boolean;
    enableFeatureConfigurationFetching?: boolean;
    useFullRedirectsForLinks?: boolean;
    // Properties for OIDC-like workflow for development
    __DEVELOPMENT__?: ApplicationOidcForDevelopmentConfig;
  };
}
