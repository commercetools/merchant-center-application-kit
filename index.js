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

export const GRAPHQL_TARGETS = {
  MERCHANT_CENTER_BACKEND: 'mc',
  COMMERCETOOLS_PLATFORM: 'ctp',
  DASHBOARD_SERVICE: 'dashboard',
  PIM_INDEXER: 'pim-indexer',
};
