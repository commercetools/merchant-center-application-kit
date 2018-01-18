export default [
  {
    name: 'mcng-dashboard',
    menu: {
      name: 'Dashboard',
      link: 'dashboard',
      labelKey: 'NavBar.Dashboard.title',
      icon: 'SpeedometerIcon',
    },
  },
  {
    name: 'mcng-products',
    menu: {
      name: 'products',
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
          name: 'products-ist',
          labelKey: 'NavBar.Products.list',
          link: 'products',
        },
        {
          name: 'products-verify-changes',
          featureToggle: 'modifiedProducts',
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
          name: 'products-search',
          featureToggle: 'pimSearch',
          labelKey: 'NavBar.Products.pimSearchList',
          link: 'products/pim-search',
          permissions: [
            {
              mode: 'manage',
              resource: 'products',
            },
          ],
        },
        {
          name: 'products-add',
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
          name: 'products-direct-access',
          labelKey: 'NavBar.Products.directAccess',
          link: 'products/direct-access',
        },
      ],
    },
  },
  {
    name: 'mcng-categories',
    menu: {
      name: 'categories',
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
          name: 'categories-list',
          labelKey: 'NavBar.Categories.list',
          link: 'categories?mode=list',
        },
        {
          name: 'categories-search',
          labelKey: 'NavBar.Categories.search',
          link: 'categories?mode=search',
        },
        {
          name: 'categories-add',
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
  },
  {
    name: 'mcng-customers',
    menu: {
      name: 'customers',
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
          name: 'customers-list',
          labelKey: 'NavBar.Customers.list',
          link: 'customers',
        },
        {
          name: 'customers-add',
          labelKey: 'NavBar.Customers.add',
          link: 'customers/new',
          permissions: [
            {
              mode: 'manage',
              resource: 'customers',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'mcng-orders',
    menu: {
      name: 'orders',
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
          name: 'orders-list',
          labelKey: 'NavBar.Orders.list',
          link: 'orders',
        },
        {
          name: 'orders-add',
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
  },
  {
    name: 'mcng-discounts',
    menu: {
      name: 'discounts',
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
          name: 'product-discounts-list',
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
          name: 'cart-discounts-list',
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
          name: 'discount-codes-list',
          labelKey: 'NavBar.DiscountCodes.list',
          link: 'discounts/codes',
          featureToggle: 'discountCodes',
          permissions: [
            {
              mode: 'view',
              resource: 'orders',
            },
          ],
        },
        {
          name: 'discounts-add',
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
  },
];
