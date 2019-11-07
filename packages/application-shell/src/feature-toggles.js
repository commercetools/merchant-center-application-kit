/*
 * This file contains a list of all feature toggles used within
 * the app shell. Each feature toggle should be a constant.
 *
 * NOTE:
 *   Default values are not yet passed to flopflip and it has to be decided
 *   how the integrate with the plugin API.
 *   The default values would be used whenever feature toggles have not been
 *   fetched from LaunchDarkly (without default values flopflip will default
 *   them to off until fetched).
 */

// NOTE:
//   These are used within the menu and need to be
//   made available within custom applications.
export const PROJECT_EXTENSIONS = 'projectExtensions';
export const PIM_SEARCH = 'pimSearch';
export const LEGACY_PRODUCT_LIST = 'legacyProductList';
export const CAN_VIEW_DASHBOARD = 'canViewDashboard';
export const CUSTOM_APPLICATIONS = 'customApplications';

export const FLAGS = {
  [CAN_VIEW_DASHBOARD]: true,
  [PIM_SEARCH]: false,
  [LEGACY_PRODUCT_LIST]: true,
  [CUSTOM_APPLICATIONS]: false,
  [PROJECT_EXTENSIONS]: true,
};
