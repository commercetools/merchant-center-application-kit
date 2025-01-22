import type { TCustomView } from './types/generated/settings';

/**
 * The project key must be between 2 and 36 characters long. It can only contain alphanumeric lowercase characters (a-z, 0-9),
 * up to two consecutive underscores (_) and hyphens (-). Leading and trailing underscore and hyphens are also not allowed.
 *
 * This regular expression has been generated using ChatGPT.
 * Explanation of the regular expression:
 * 1. ^: Asserts the start of the string.
 * 2. (?!.*(?:[-_]{3}|^[-_]|[-_]$)): Negative lookahead assertion ensures that there are no three consecutive hyphens or underscores ([-_]{3}), no leading hyphen or underscore (^[-_]), and no trailing hyphen or underscore ([-_]$).
 * 3. (?=.{2,36}$): Positive lookahead assertion ensures that the length of the string is between 2 and 36 characters.
 * 4. (?:[a-z1-9][a-z0-9]*)?: Non-capturing group matches an optional first character that cannot be '0' ([a-z1-9]) followed by zero or more lowercase alphanumeric characters ([a-z0-9]*).
 * 5. (?:[-_]{0,2}[a-z0-9]+)*: Non-capturing group matches zero, one, or two hyphens or underscores followed by one or more lowercase alphanumeric characters. This group can repeat zero or more times.
 * 6. $: Asserts the end of the string.
 */
export const PROJECT_KEY_REGEX =
  /^(?!.*(?:[-_]{3}|^[-_]|[-_]$))(?=.{2,36}$)(?:[a-z1-9][a-z0-9]*)?(?:[-_]{0,2}[a-z0-9]+)*$/;

/**
 * The entryPointUriPath may be between 2 and 64 characters and only contain alphabetic lowercase characters,
 * non-consecutive underscores and hyphens. Leading and trailing underscore and hyphens are also not allowed.
 *
 * This regular expression has been generated using ChatGPT.
 * Explanation of the regular expression:
 * 1. ^: Asserts the start of the string.
 * 2. (?!.*(?:[-_]{2}|^[-_]|[-_]$)): Negative lookahead assertion ensures that there are no two consecutive hyphens or underscores ([-_]{2}), no leading hyphen or underscore (^[-_]), and no trailing hyphen or underscore ([-_]$).
 * 3. (?=.{2,64}$): Positive lookahead assertion ensures that the length of the string is between 2 and 64 characters.
 * 4. (?:[a-z1-9][a-z0-9]*)?: Non-capturing group matches an optional first character that cannot be '0' ([a-z1-9]) followed by zero or more lowercase alphanumeric characters ([a-z0-9]*).
 * 5. (?:[-_]{0,1}[a-z0-9]+)*: Non-capturing group matches zero, or one hyphen or underscore followed by one or more lowercase alphanumeric characters. This group can repeat zero or more times.
 * 6. $: Asserts the end of the string.
 */
export const ENTRY_POINT_URI_PATH_REGEX =
  /^(?!.*(?:[-_]{2}|^[-_]|[-_]$))(?=.{2,64}$)(?:[a-z1-9][a-z0-9]*)?(?:[-_]{0,1}[a-z0-9]+)*$/;

/**
 * The permission group name may be between 2 and 64 characters and only contain alphanumeric lowercase characters and non-consecutive hyphens.
 * Leading and trailing hyphens are also not allowed.
 */
export const PERMISSION_GROUP_NAME_REGEX =
  /^[^-#\W]([a-z]|[-](?![-])){0,62}[^-#\W]$/;

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
  IMPORT: 'import',
  EXPORT: 'export',
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

export const HTTP_SECURITY_HEADER_KEYS = {
  'Content-Security-Policy': 'Content-Security-Policy',
  'Referrer-Policy': 'Referrer-Policy',
  'Permissions-Policy': 'Permissions-Policy',
  'Strict-Transport-Security': 'Strict-Transport-Security',
  'X-XSS-Protection': 'X-XSS-Protection',
  'X-Content-Type-Options': 'X-Content-Type-Options',
  'X-Frame-Options': 'X-Frame-Options',
} as const;
export type THttpSecurityHeaders = keyof typeof HTTP_SECURITY_HEADER_KEYS;
export const HTTP_SECURITY_HEADERS = {
  [HTTP_SECURITY_HEADER_KEYS['Referrer-Policy']]: 'same-origin',
  [HTTP_SECURITY_HEADER_KEYS['Permissions-Policy']]:
    // Note: we need to use `(self)` to ensure that Custom Views (rendered within an `<iframe>`)
    // can inherit the main application permissions policy and override other directives if needed.
    'microphone=(self), camera=(self), payment=(self), usb=(self), geolocation=(self)',
  [HTTP_SECURITY_HEADER_KEYS['Strict-Transport-Security']]:
    'max-age=31536000; includeSubDomains; preload',
  [HTTP_SECURITY_HEADER_KEYS['X-XSS-Protection']]: '1; mode=block',
  [HTTP_SECURITY_HEADER_KEYS['X-Content-Type-Options']]: 'nosniff',
  [HTTP_SECURITY_HEADER_KEYS['X-Frame-Options']]: 'SAMEORIGIN',
} as const;

// Custom Views events (messages sent between the host application and the custom view)
export const CUSTOM_VIEWS_EVENTS_NAMES = {
  CUSTOM_VIEW_BOOTSTRAP: 'custom-view-bootstrap',
  CUSTOM_VIEW_INITIALIZATION: 'custom-view-initialization',
  CUSTOM_VIEW_CLOSE: 'custom-view-close',
  CUSTOM_VIEW_READY: 'custom-view-ready',
};
export const CUSTOM_VIEWS_EVENTS_META = {
  HOST_APPLICATION_CODE: 'mc-host-application',
  CUSTOM_VIEW_KEY_PREFIX: 'custom-view-',
};

// SSO
export const ORGANIZATION_GENERAL_ERROR = 'organizationGeneralError';
export const LOGIN_STRATEGY_DEFAULT = 'default';
export const LOGIN_STRATEGY_OIDC = 'oidc';
export const LOGIN_STRATEGY_SSO = 'sso';
