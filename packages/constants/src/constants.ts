import type { TCustomView } from './types/generated/settings';

/**
 * The entryPointUriPath may be between 2 and 36 characters and only contain alphabetic lowercase characters,
 * non-consecutive underscores and hyphens. Leading and trailing underscore and hyphens are also not allowed.
 */
export const PROJECT_KEY_REGEX = /^[^-_#]([0-9a-z]|[-_](?![-_])){0,34}[^-_#]$/g;

/**
 * The entryPointUriPath may be between 2 and 64 characters and only contain alphabetic lowercase characters,
 * non-consecutive underscores and hyphens. Leading and trailing underscore and hyphens are also not allowed.
 */
export const ENTRY_POINT_URI_PATH_REGEX =
  /^[^-_#]([0-9a-z]|[-_](?![-_])){0,62}[^-_#]$/g;

/**
 * The permission group name may be between 2 and 64 characters and only contain alphanumeric lowercase characters and non-consecutive hyphens. Leading and trailing hyphens are also not allowed.
 */
export const PERMISSION_GROUP_NAME_REGEX =
  /^[^-#]([a-z]|[-](?![-])){0,62}[^-#]$/g;

// DOM elements
export const PORTALS_CONTAINER_ID = 'portals-container';
export const PORTALS_CONTAINER_INDENTATION_SIZE = '48px';

// Links
export const SUPPORT_PORTAL_URL = 'https://support.commercetools.com';

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
export type TAppNotificationDomain =
  (typeof NOTIFICATION_DOMAINS)[keyof typeof NOTIFICATION_DOMAINS];
// Alias to `NOTIFICATION_DOMAINS` for backwards compatibility
export const DOMAINS = NOTIFICATION_DOMAINS;

export type TAppNotificationKindSide =
  (typeof NOTIFICATION_KINDS_SIDE)[keyof typeof NOTIFICATION_KINDS_SIDE];
export type TAppNotificationKindGlobal =
  (typeof NOTIFICATION_KINDS_GLOBAL)[keyof typeof NOTIFICATION_KINDS_GLOBAL];
export type TAppNotificationKindPage =
  (typeof NOTIFICATION_KINDS_PAGE)[keyof typeof NOTIFICATION_KINDS_PAGE];
export type TAppNotificationKind =
  | TAppNotificationKindSide
  | TAppNotificationKindGlobal
  | TAppNotificationKindPage;
export type TAppNotificationOfDomain = { domain: TAppNotificationDomain };
export type TAppNotificationOfKind<T extends TAppNotificationOfDomain> =
  TAppNotificationOfDomain & {
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
  /** @deprecated Use `extensions.code` */
  code?: string;
  extensions?: {
    code?: string;
  };
} & ExtraFields;
export type TAppNotificationValuesApiError<ExtraFields extends {} = {}> = {
  errors: TAppNotificationApiError<ExtraFields>[];
};
export type TAppNotificationValuesUnexpectedError = { errorId?: string };
export type TAppNotification<T extends TAppNotificationOfKind<T>> =
  TAppNotificationOfKind<T> & {
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
export const NO_VALUE_FALLBACK = '- -';

// HTTP requests and responses
export const STATUS_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNAUTHENTICATED: 299,
  NOT_FOUND: 404,
} as const;
export type TStatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];

export const LOGOUT_REASONS = {
  USER: 'user',
  UNAUTHORIZED: 'unauthorized',
  INVALID: 'invalid',
  DELETED: 'deleted',
  NO_PROJECTS: 'no-projects',
} as const;
export type TLogoutReason =
  (typeof LOGOUT_REASONS)[keyof typeof LOGOUT_REASONS];

export const GRAPHQL_TARGETS = {
  MERCHANT_CENTER_BACKEND: 'mc',
  COMMERCETOOLS_PLATFORM: 'ctp',
  DASHBOARD_SERVICE: 'dashboard',
  CHANGE_HISTORY_SERVICE: 'change-history',
  PIM_INDEXER: 'pim-indexer',
  ORDER_INDEXER: 'order-indexer',
  SETTINGS_SERVICE: 'settings',
  ADMINISTRATION_SERVICE: 'administration',
} as const;
export type TGraphQLTargets =
  (typeof GRAPHQL_TARGETS)[keyof typeof GRAPHQL_TARGETS];

export const MC_API_PROXY_TARGETS = {
  COMMERCETOOLS_PLATFORM: 'ctp',
  MACHINE_LEARNING: 'ml',
  PIM_SEARCH: 'pim-search',
  ORDER_SEARCH: 'order-search',
  MC_METRICS: 'mc-metrics',
  IMPORT: 'import',
} as const;
export type TMcApiProxyTargets =
  (typeof MC_API_PROXY_TARGETS)[keyof typeof MC_API_PROXY_TARGETS];

export type TLocalizedField = {
  locale: string;
  value: string;
};
export type TPermissionData = {
  name: string;
  oAuthScopes: string[];
};
export type ApplicationMenuLinksForDevelopmentConfig = {
  icon: string;
  defaultLabel: string;
  labelAllLocales: TLocalizedField[];
  permissions: string[];
  submenuLinks: {
    uriPath: string;
    defaultLabel: string;
    labelAllLocales: TLocalizedField[];
    permissions: string[];
  }[];
};
export type ApplicationOidcForDevelopmentConfig = {
  authorizeUrl: string;
  initialProjectKey?: string;
  teamId?: string;
  applicationId?: string;
  customViewId?: string;
  oAuthScopes?: {
    view: string[];
    manage: string[];
  };
  additionalOAuthScopes?: {
    name: string;
    view: string[];
    manage: string[];
  }[];
};
export type CustomViewData = {
  id: string;
  defaultLabel: string;
  labelAllLocales: TLocalizedField[];
  description?: string;
  url: string;
  permissions: TPermissionData[];
  locators: string[];
  type: TCustomView['type'];
  typeSettings?: TCustomView['typeSettings'];
};

export type ApplicationRuntimeEnvironmentForDevelopment = {
  oidc?: ApplicationOidcForDevelopmentConfig;
  menuLinks?: ApplicationMenuLinksForDevelopmentConfig;
  customViewHostUrl?: string;
  customViewConfig?: CustomViewData;
};

export type ApplicationRuntimeEnvironment = {
  // @deprecated: use `applicationIdentifier`
  applicationId: string;
  applicationIdentifier: string;
  applicationName: string;
  entryPointUriPath: string;
  customViewId?: string;
  revision: string;
  env: string;
  location: string;
  cdnUrl: string;
  mcApiUrl: string;
  frontendHost: string;
  servedByProxy: boolean;
  // Optional properties. To use them, pass them to the `additionalEnv` object of the application config.
  ldClientSideId?: string;
  trackingSentry?: string;
  // Development-only configuration
  __DEVELOPMENT__?: ApplicationRuntimeEnvironmentForDevelopment;
};

// Global application environment on window object
export interface ApplicationWindow extends Window {
  app: ApplicationRuntimeEnvironment;
}

// Used for Custom Views, as we want to keep the `entryPointUriPath` value required in the runtime config.
export const CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH = '@@custom-view-host@@';

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

export const HTTP_SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'same-origin',
} as const;

export const CUSTOM_EXTENSION_TYPES = {
  CUSTOM_APPLICATION: 'custom-application',
  CUSTOM_VIEW: 'custom-view',
};

// Custom Views events (messages sent between the host application and the custom view)
export const CUSTOM_VIEWS_EVENTS_NAMES = {
  CUSTOM_VIEW_BOOTSTRAP: 'custom-view-bootstrap',
  CUSTOM_VIEW_INITIALIZATION: 'custom-view-initialization',
};
export const CUSTOM_VIEWS_EVENTS_META = {
  SOURCE: 'mc-host-application',
  DESTINATION_PREFIX: 'custom-view-',
};

// SSO
export const ORGANIZATION_GENERAL_ERROR = 'organizationGeneralError';
export const LOGIN_STRATEGY_DEFAULT = 'default';
export const LOGIN_STRATEGY_OIDC = 'oidc';
export const LOGIN_STRATEGY_SSO = 'sso';
