import { permissions } from '@commercetools-frontend/permissions';
import { MCSupportFormURL } from '../../constants';
import {
  CUSTOMER_GROUPS,
  PIM_SEARCH,
  DEVELOPER_SETTINGS,
  CAN_VIEW_CATEGORIES,
  CAN_VIEW_ORDERS,
  CAN_VIEW_DISCOUNTS,
  CUSTOM_APPLICATIONS,
} from './feature-toggles';

const itemsCategories = {
  key: 'Categories',
  uriPath: 'categories',
  labelKey: 'NavBar.Categories.title',
  icon: 'TreeStructureIcon',
  featureToggle: CAN_VIEW_CATEGORIES,
  permissions: [permissions.ViewProducts, permissions.ManageProducts],
  submenu: [
    {
      key: 'Categories',
      labelKey: 'NavBar.Categories.list',
      uriPath: 'categories?mode=list',
      menuVisibility: 'hideCategoriesList',
    },
    {
      key: 'CategoriesSearch',
      labelKey: 'NavBar.Categories.search',
      uriPath: 'categories?mode=search',
      menuVisibility: 'hideCategoriesSearch',
    },
    {
      key: 'AddCategory',
      labelKey: 'NavBar.Categories.add',
      uriPath: 'categories/new',
      permissions: [permissions.ManageProducts],
      menuVisibility: 'hideAddCategory',
    },
  ],
};

const itemsCustomers = {
  key: 'Customers',
  uriPath: 'customers',
  labelKey: 'NavBar.Customers.title',
  icon: 'UserFilledIcon',
  permissions: [permissions.ViewCustomers, permissions.ManageCustomers],
  submenu: [
    {
      key: 'Customers',
      labelKey: 'NavBar.Customers.list',
      uriPath: 'customers',
      menuVisibility: 'hideCustomersList',
    },
    {
      key: 'AddCustomer',
      labelKey: 'NavBar.Customers.add',
      uriPath: 'customers/new',
      permissions: [permissions.ManageCustomers],
      menuVisibility: 'hideAddCustomer',
    },
    {
      key: 'CustomerGroups',
      labelKey: 'NavBar.CustomerGroups.list',
      featureToggle: CUSTOMER_GROUPS,
      uriPath: 'customers/customer-groups',
      menuVisibility: 'hideCustomerGroupsList',
    },
    {
      key: 'AddCustomerGroup',
      labelKey: 'NavBar.CustomerGroups.add',
      featureToggle: CUSTOMER_GROUPS,
      uriPath: 'customers/customer-groups/new',
      permissions: [permissions.ManageCustomers],
      menuVisibility: 'hideAddCustomerGroup',
    },
  ],
};

const itemsDashboard = {
  key: 'Dashboard',
  uriPath: 'dashboard',
  labelKey: 'NavBar.Dashboard.title',
  icon: 'SpeedometerIcon',
  permissions: [permissions.ViewOrders, permissions.ManageProducts],
  submenu: [],
};

const itemsDiscounts = {
  key: 'Discounts',
  uriPath: 'discounts',
  labelKey: 'NavBar.Discounts.title',
  icon: 'TagMultiIcon',
  featureToggle: CAN_VIEW_DISCOUNTS,
  permissions: [
    permissions.ViewProducts,
    permissions.ManageProducts,
    permissions.ViewOrders,
    permissions.ManageOrders,
  ],
  submenu: [
    {
      key: 'ProductDiscounts',
      labelKey: 'NavBar.ProductDiscounts.list',
      uriPath: 'discounts/products',
      permissions: [permissions.ViewProducts],
      menuVisibility: 'hideProductDiscountsList',
    },
    {
      key: 'CartDiscounts',
      labelKey: 'NavBar.CartDiscounts.list',
      uriPath: 'discounts/carts',
      permissions: [permissions.ViewOrders],
      menuVisibility: 'hideCartDiscountsList',
    },
    {
      key: 'DiscountCodes',
      labelKey: 'NavBar.DiscountCodes.list',
      uriPath: 'discounts/codes',
      permissions: [permissions.ViewOrders],
      menuVisibility: 'hideDiscountCodesList',
    },
    {
      key: 'AddDiscount',
      labelKey: 'NavBar.Discounts.add',
      uriPath: 'discounts/new',
      permissions: [permissions.ManageProducts, permissions.ManageOrders],
      menuVisibility: 'hideAddDiscounts',
    },
  ],
};

const itemsOrders = {
  key: 'Orders',
  uriPath: 'orders',
  labelKey: 'NavBar.Orders.title',
  icon: 'CartIcon',
  featureToggle: CAN_VIEW_ORDERS,
  permissions: [permissions.ViewOrders, permissions.ManageOrders],
  submenu: [
    {
      key: 'Orders',
      labelKey: 'NavBar.Orders.list',
      uriPath: 'orders',
      menuVisibility: 'hideOrdersList',
    },
    {
      key: 'AddOrders',
      labelKey: 'NavBar.Orders.add',
      uriPath: 'orders/new',
      permissions: [permissions.ManageOrders],
      menuVisibility: 'hideAddOrder',
    },
  ],
};

const itemsProducts = {
  key: 'Products',
  uriPath: 'products',
  labelKey: 'NavBar.Products.title',
  icon: 'BoxIcon',
  permissions: [permissions.ViewProducts, permissions.ManageProducts],
  submenu: [
    {
      key: 'ProductList',
      labelKey: 'NavBar.Products.list',
      uriPath: 'products',
      menuVisibility: 'hideProductsList',
    },
    {
      key: 'ModifiedProducts',
      labelKey: 'NavBar.Products.reviewModifiedProducts',
      uriPath: 'products/modified',
      permissions: [permissions.ManageProducts],
      menuVisibility: 'hideModifiedProducts',
    },
    {
      key: 'PimSearchList',
      featureToggle: PIM_SEARCH,
      labelKey: 'NavBar.Products.pimSearchList',
      uriPath: 'products/pim-search',
      permissions: [permissions.ViewProducts, permissions.ManageProducts],
      menuVisibility: 'hidePimSearchList',
    },
    {
      key: 'AddProduct',
      labelKey: 'NavBar.Products.add',
      uriPath: 'products/new',
      permissions: [permissions.ManageProducts],
      menuVisibility: 'hideAddProduct',
    },
    {
      key: 'DirectAccess',
      labelKey: 'NavBar.Products.directAccess',
      uriPath: 'products/direct-access',
      menuVisibility: 'hideDirectAccess',
    },
  ],
};

const itemsProjectSettings = {
  key: 'Settings',
  uriPath: 'settings',
  labelKey: 'NavBar.Settings.title',
  icon: 'GearIcon',
  permissions: [
    permissions.ManageProject,
    permissions.ManageProducts,
    permissions.ViewProducts,
  ],
  submenu: [
    {
      key: 'Project settings',
      labelKey: 'NavBar.ProjectSettings.title',
      uriPath: 'settings/project',
      permissions: [permissions.ManageProject],
      menuVisibility: 'hideProjectSettings',
    },
    {
      key: 'Product types',
      labelKey: 'NavBar.ProductTypes.title',
      uriPath: 'settings/product-types',
      permissions: [
        permissions.ManageProject,
        permissions.ManageProducts,
        permissions.ViewProducts,
      ],
      menuVisibility: 'hideProductTypes',
    },
    {
      key: 'Developer settings',
      featureToggle: DEVELOPER_SETTINGS,
      labelKey: 'NavBar.DeveloperSettings.title',
      uriPath: 'settings/developer',
      permissions: [permissions.ManageProject],
      menuVisibility: 'hideDeveloperSettings',
    },
    {
      key: 'Custom Applications',
      featureToggle: CUSTOM_APPLICATIONS,
      labelKey: 'NavBar.CustomApplications.title',
      uriPath: 'settings/custom-applications',
      permissions: [permissions.ManageProject],
      menuVisibility: 'hideCustomApplications',
    },
  ],
};

const itemsMCSupport = {
  key: 'Support',
  externalLink: MCSupportFormURL,
  labelKey: 'NavBar.MCSupport.title',
  icon: 'SupportIcon',
  tracking: {
    'data-track-component': 'Support-links',
    'data-track-event': 'click',
    'data-track-label': 'support_icon',
  },
};

// List order is important!
// eslint-disable-next-line import/prefer-default-export
export const defaultNavigationItems = [
  itemsDashboard,
  itemsProducts,
  itemsCategories,
  itemsCustomers,
  itemsOrders,
  itemsDiscounts,
  itemsProjectSettings,
  itemsMCSupport,
];
