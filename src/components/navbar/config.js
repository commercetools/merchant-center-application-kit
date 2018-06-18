import { MCSupportFormURL } from '../../constants';
import {
  CUSTOMER_GROUPS,
  PIM_SEARCH,
  PRODUCT_TYPES_ADMINISTRATION,
  DEVELOPER_SETTINGS,
} from './feature-toggles';

const itemsCategories = {
  name: 'application-categories',
  menu: {
    name: 'Categories',
    link: 'categories',
    labelKey: 'NavBar.Categories.title',
    icon: 'CategoryTreeIcon',
    permissions: [
      {
        mode: 'view',
        resource: 'products',
      },
      {
        mode: 'manage',
        resource: 'products',
      },
    ],
    submenu: [
      {
        name: 'Categories',
        labelKey: 'NavBar.Categories.list',
        link: 'categories?mode=list',
      },
      {
        name: 'CategoriesSearch',
        labelKey: 'NavBar.Categories.search',
        link: 'categories?mode=search',
      },
      {
        name: 'AddCategory',
        labelKey: 'NavBar.Categories.add',
        link: 'categories/new',
        permissions: [
          {
            mode: 'manage',
            resource: 'products',
          },
        ],
      },
    ],
  },
};

const itemsCustomers = {
  name: 'application-customers',
  menu: {
    name: 'Customers',
    link: 'customers',
    labelKey: 'NavBar.Customers.title',
    icon: 'CustomerFilledIcon',
    permissions: [
      {
        mode: 'view',
        resource: 'customers',
      },
      {
        mode: 'manage',
        resource: 'customers',
      },
    ],
    submenu: [
      {
        name: 'Customers',
        labelKey: 'NavBar.Customers.list',
        link: 'customers',
      },
      {
        name: 'AddCustomer',
        labelKey: 'NavBar.Customers.add',
        link: 'customers/new',
        permissions: [
          {
            mode: 'manage',
            resource: 'customers',
          },
        ],
      },
      {
        name: 'CustomerGroups',
        labelKey: 'NavBar.CustomerGroups.list',
        featureToggle: CUSTOMER_GROUPS,
        link: 'customers/customer-groups',
      },
      {
        name: 'AddCustomerGroup',
        labelKey: 'NavBar.CustomerGroups.add',
        featureToggle: CUSTOMER_GROUPS,
        link: 'customers/customer-groups/new',
        permissions: [
          {
            mode: 'manage',
            resource: 'customers',
          },
        ],
      },
    ],
  },
};

const itemsDashboard = {
  name: 'application-dashboard',
  menu: {
    name: 'Dashboard',
    link: 'dashboard',
    labelKey: 'NavBar.Dashboard.title',
    icon: 'SpeedometerIcon',
    permissions: [
      {
        mode: 'view',
        resource: 'orders',
      },
      {
        mode: 'manage',
        resource: 'products',
      },
    ],
  },
};

const itemsDiscounts = {
  name: 'application-discounts',
  menu: {
    name: 'Discounts',
    link: 'discounts',
    labelKey: 'NavBar.Discounts.title',
    icon: 'TagMultiIcon',
    permissions: [
      {
        mode: 'view',
        resource: 'products',
      },
      {
        mode: 'manage',
        resource: 'products',
      },
      {
        mode: 'view',
        resource: 'orders',
      },
      {
        mode: 'manage',
        resource: 'orders',
      },
    ],
    submenu: [
      {
        name: 'ProductDiscounts',
        labelKey: 'NavBar.ProductDiscounts.list',
        link: 'discounts/products',
        permissions: [
          {
            mode: 'view',
            resource: 'products',
          },
        ],
      },
      {
        name: 'CartDiscounts',
        labelKey: 'NavBar.CartDiscounts.list',
        link: 'discounts/carts',
        permissions: [
          {
            mode: 'view',
            resource: 'orders',
          },
        ],
      },
      {
        name: 'DiscountCodes',
        labelKey: 'NavBar.DiscountCodes.list',
        link: 'discounts/codes',
        permissions: [
          {
            mode: 'view',
            resource: 'orders',
          },
        ],
      },
      {
        name: 'AddDiscount',
        labelKey: 'NavBar.Discounts.add',
        link: 'discounts/new',
        permissions: [
          {
            mode: 'manage',
            resource: 'products',
          },
          {
            mode: 'manage',
            resource: 'orders',
          },
        ],
      },
    ],
  },
};

const itemsOrders = {
  name: 'application-orders',
  menu: {
    name: 'Orders',
    link: 'orders',
    labelKey: 'NavBar.Orders.title',
    icon: 'CartIcon',
    permissions: [
      {
        mode: 'view',
        resource: 'orders',
      },
      {
        mode: 'manage',
        resource: 'orders',
      },
    ],
    submenu: [
      {
        name: 'Orders',
        labelKey: 'NavBar.Orders.list',
        link: 'orders',
      },
      {
        name: 'AddOrders',
        labelKey: 'NavBar.Orders.add',
        link: 'orders/new',
        permissions: [
          {
            mode: 'manage',
            resource: 'orders',
          },
        ],
      },
    ],
  },
};

const itemsProducts = {
  name: 'application-products',
  menu: {
    name: 'Products',
    link: 'products',
    labelKey: 'NavBar.Products.title',
    icon: 'BoxProductIcon',
    permissions: [
      {
        mode: 'view',
        resource: 'products',
      },
      {
        mode: 'manage',
        resource: 'products',
      },
    ],
    submenu: [
      {
        name: 'ProductList',
        labelKey: 'NavBar.Products.list',
        link: 'products',
      },
      {
        name: 'ModifiedProducts',
        labelKey: 'NavBar.Products.reviewModifiedProducts',
        link: 'products/modified',
        permissions: [
          {
            mode: 'manage',
            resource: 'products',
          },
        ],
      },
      {
        name: 'PimSearchList',
        featureToggle: PIM_SEARCH,
        labelKey: 'NavBar.Products.pimSearchList',
        link: 'products/pim-search',
        permissions: [
          {
            mode: 'view',
            resource: 'products',
          },
          {
            mode: 'manage',
            resource: 'products',
          },
        ],
      },
      {
        name: 'AddProduct',
        labelKey: 'NavBar.Products.add',
        link: 'products/new',
        permissions: [
          {
            mode: 'manage',
            resource: 'products',
          },
        ],
      },
      {
        name: 'DirectAccess',
        labelKey: 'NavBar.Products.directAccess',
        link: 'products/direct-access',
      },
    ],
  },
};

const itemsProjectSettings = {
  name: 'application-project-settings',

  menu: {
    name: 'Settings',
    link: 'settings',
    labelKey: 'NavBar.Settings.title',
    icon: 'ProjectSettingsIcon',
    permissions: [
      {
        mode: 'manage',
        resource: 'project',
      },
      {
        mode: 'manage',
        resource: 'products',
      },
      {
        mode: 'view',
        resource: 'products',
      },
    ],
    submenu: [
      {
        name: 'Project settings',
        labelKey: 'NavBar.ProjectSettings.title',
        link: 'settings/project/international',
        permissions: [
          {
            mode: 'manage',
            resource: 'project',
          },
        ],
      },
      {
        name: 'Product types',
        featureToggle: PRODUCT_TYPES_ADMINISTRATION,
        labelKey: 'NavBar.ProductTypes.title',
        link: 'settings/product-types',
        permissions: [
          {
            mode: 'manage',
            resource: 'project',
          },
          {
            mode: 'manage',
            resource: 'products',
          },
          {
            mode: 'view',
            resource: 'products',
          },
        ],
      },
      {
        name: 'Developer settings',
        featureToggle: DEVELOPER_SETTINGS,
        labelKey: 'NavBar.DeveloperSettings.title',
        link: 'settings/developer',
        permissions: [
          {
            mode: 'manage',
            resource: 'project',
          },
        ],
      },
    ],
  },
};

const itemsMCSupport = {
  name: 'mc-support',
  menu: {
    name: 'Support',
    externalLink: MCSupportFormURL,
    labelKey: 'NavBar.MCSupport.title',
    icon: 'SupportIcon',
    tracking: {
      'data-track-component': 'Support-links',
      'data-track-event': 'click',
      'data-track-label': 'support_icon',
    },
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
