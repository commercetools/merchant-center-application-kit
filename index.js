// STORAGE
export const STORAGE_KEYS = {
  NONCE: 'nonce',
  TOKEN: 'token',
  ACTIVE_PROJECT_KEY: 'activeProjectKey',
  SELECTED_DATA_LOCALE: 'selectedDataLocale',
  IS_FORCED_MENU_OPEN: 'isForcedMenuOpen',
};

// SSO
export const ORGANIZATION_GENERAL_ERROR = 'organizationGeneralError';
export const INTERNAL_AUTH_PROVIDER = 'commercetools';
export const EXTERNAL_AUTH_PROVIDER = 'external';
// This is a key used as a public claim in a JWT. The key is prefixed by a
// "collision-resistant namespace", in this case a "domain name".
export const ACCESS_TOKEN_NAMESPACE = 'https://mc.ct.com/';
export const ACCESS_TOKEN_IDP_URL_KEY = 'idp_url';
export const LOGIN_STRATEGY_DEFAULT = 'default';
export const LOGIN_STRATEGY_SSO = 'sso';

// PLUGINS
export const ACTIVATE_PLUGIN = 'ACTIVATE_PLUGIN';
export const DEACTIVATE_PLUGIN = 'DEACTIVATE_PLUGIN';
export const INIT_PLUGIN = 'INIT_PLUGIN';
export const __LOCAL = 'LOCAL';
export const __GLOBAL = 'GLOBAL';

// APPLICATION STATE
export const LOGGED_IN = 'LOGGED_IN';
export const SET_TOKEN = 'SET_TOKEN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const SWITCH_LOCALE = 'SWITCH_LOCALE';
export const SWITCH_PROJECT_LANGUAGE = 'SWITCH_PROJECT_LANGUAGE';
export const FORCE_MENU_TOGGLE = 'FORCE_MENU_TOGGLE';

// NOTIFICATIONS
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const HIDE_ALL_PAGE_NOTIFICATIONS = 'HIDE_ALL_PAGE_NOTIFICATIONS';
export const DOMAINS = {
  GLOBAL: 'global',
  PAGE: 'page',
  SIDE: 'side',
};

// ERRORS
export const UNAUTHORIZED = 'UNAUTHORIZED';

// CORE ACTIONS
export const INITIALIZE_SEARCH_SLICE = 'INITIALIZE_SEARCH_SLICE';
export const SET_SEARCH_FILTER_STATE = 'SET_SEARCH_FILTER_STATE';
export const SET_SEARCH_FILTER_RESULT = 'SET_SEARCH_FILTER_RESULT';
export const REMOVE_ENTITY_BY_ID_FROM_SEARCH_RESULTS =
  'REMOVE_ENTITY_BY_ID_FROM_SEARCH_RESULTS';
export const PRODUCTS_REFERENCE_SEARCH_FETCHED =
  'PRODUCTS_REFERENCE_SEARCH_FETCHED';
export const CATEGORIES_REFERENCE_SEARCH_FETCHED =
  'CATEGORIES_REFERENCE_SEARCH_FETCHED';

// MANAGEMENT
export const INITIAL_STATE_FETCHED = 'INITIAL_STATE_FETCHED';

// IMPEX
export const IMPORT_JOB_CREATED = 'IMPORT_JOB_CREATED';
export const EXPORT_JOB_CREATED = 'EXPORT_JOB_CREATED';

// NO VALUE FALLBACK
export const NO_VALUE_FALLBACK = '- - - -';

export const PRODUCT_STATUSES = {
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  MODIFIED: 'modified',
};

export const PRODUCT_ACTIONS = {
  PUBLISH: 'publish',
  UNPUBLISH: 'unpublish',
};

export const STATUS_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNAUTHENTICATED: 299,
  NOT_FOUND: 404,
};

export const LOGOUT_REASONS = {
  NO_PROJECTS: 'no-projects',
  USER: 'user',
  UNAUTHORIZED: 'unauthorized',
  INVALID: 'invalid',
};

export const MANAGE_PRODUCTS_PERMISSION = {
  mode: 'manage',
  resource: 'products',
};

export const VIEW_PRODUCTS_PERMISSION = {
  mode: 'view',
  resource: 'products',
};

export const MANAGE_CUSTOMERS_PERMISSION = {
  mode: 'manage',
  resource: 'customers',
};

export const MANAGE_ORDERS_PERMISSION = {
  mode: 'manage',
  resource: 'orders',
};

export const FILTER_TYPES = {
  lessThan: 'lessThan',
  moreThan: 'moreThan',
  equalTo: 'equalTo',
  range: 'range',
  missing: 'missing',
  missingIn: 'missingIn',
  in: 'in',
};

export const REQUESTS_IN_FLIGHT_LOADER_DOM_ID = 'loader-for-requests-in-flight';

export const GRAPHQL_TARGETS = {
  MERCHANT_CENTER_BACKEND: 'mc',
  COMMERCETOOLS_PLATFORM: 'ctp',
  DASHBOARD_SERVICE: 'dashboard',
  PIM_INDEXER: 'pim-indexer',
};

// Plugin Names for the menu items
export const PLUGIN_NAMES = {
  SETTINGS: 'Settings',
};
