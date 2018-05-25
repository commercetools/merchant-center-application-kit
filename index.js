export const __GLOBAL = 'GLOBAL';

// NOTIFICATIONS
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const HIDE_ALL_PAGE_NOTIFICATIONS = 'HIDE_ALL_PAGE_NOTIFICATIONS';
export const DOMAINS = {
  GLOBAL: 'global',
  PAGE: 'page',
  SIDE: 'side',
};

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

// NO VALUE FALLBACK
export const NO_VALUE_FALLBACK = '- - - -';

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

export const GRAPHQL_TARGETS = {
  MERCHANT_CENTER_BACKEND: 'mc',
  COMMERCETOOLS_PLATFORM: 'ctp',
  DASHBOARD_SERVICE: 'dashboard',
  PIM_INDEXER: 'pim-indexer',
};
