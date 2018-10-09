/*
 * This file contains a list of all feature toggles used within
 * this plugin. Each feature toggle should be a constant.
 *
 * NOTE:
 *   Default values are not yet passed to flopflip and it has to be decided
 *   how the integrate with the plugin API.
 *   The default values would be used whenever feature toggles have not been
 *   fetched from LaunchDarkly (without default values flopflip will default
 *   them to off until fetched).
 */

// FIXME: This is a temporary solution to match an urgent request from
// a specific customer. Should be properly implemented once we have a
// better abstraction. For more info see the discussion thread on https://github.com/commercetools/merchant-center-frontend/pull/4107
export const CAN_VIEW_DASHBOARD = 'canViewDashboard';
export const CAN_VIEW_ORDERS = 'canViewOrders';
export const CAN_VIEW_CATEGORIES = 'canViewCategories';
export const CAN_VIEW_PRODUCTS = 'canViewProducts';
export const CAN_VIEW_DISCOUNTS = 'canViewDiscounts';

export const CUSTOMER_GROUPS = 'customerGroups';

export const CART_DISCOUNT_RULE_BUILDER = 'cartDiscountRuleBuilder';
export const CREATE_CODES_WITHIN_CART_DISCOUNT_DETAILS =
  'createCodesWithinCartDiscountDetails';
export const DISCOUNT_RULE_BUILDER_DROPDOWN = 'extendedRuleBuilderDropdown';
export const DISCOUNTS_BULK_SELECTION_STATUS =
  'discounts-bulk-selection-status';

export const PIM_SEARCH = 'pimSearch';
export const PRICE_TIERS = 'productPriceTiers';

export const DEVELOPER_SETTINGS = 'developerSettings';
export const PROJECT_EXTENSIONS = 'projectExtensions';
