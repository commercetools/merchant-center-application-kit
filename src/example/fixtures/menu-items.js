export default [
  {
    name: 'mcng-dashboard',
    menu: {
      name: 'Dashboard',
      link: 'dashboard',
      labelKey: 'Menu.Dashboard.title',
      icon: 'SpeedometerIcon',
    },
  },
  {
    name: 'mcng-products',
    menu: {
      name: 'products',
      link: 'products',
      labelKey: 'Menu.Products.title',
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
          labelKey: 'Menu.Products.list',
          link: 'products',
        },
        {
          name: 'products-verify-changes',
          featureToggle: 'modifiedProducts',
          labelKey: 'Menu.Products.reviewModifiedProducts',
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
          labelKey: 'Menu.Products.pimSearchList',
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
          labelKey: 'Menu.Products.add',
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
          labelKey: 'Menu.Products.directAccess',
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
      labelKey: 'Menu.Categories.title',
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
          labelKey: 'Menu.Categories.list',
          link: 'categories?mode=list',
        },
        {
          name: 'categories-search',
          labelKey: 'Menu.Categories.search',
          link: 'categories?mode=search',
        },
        {
          name: 'categories-add',
          labelKey: 'Menu.Categories.add',
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
      labelKey: 'Menu.Customers.title',
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
          labelKey: 'Menu.Customers.list',
          link: 'customers',
        },
        {
          name: 'customers-add',
          labelKey: 'Menu.Customers.add',
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
      labelKey: 'Menu.Orders.title',
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
          labelKey: 'Menu.Orders.list',
          link: 'orders',
        },
        {
          name: 'orders-add',
          labelKey: 'Menu.Orders.add',
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
      labelKey: 'Menu.Discounts.title',
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
          labelKey: 'Menu.ProductDiscounts.list',
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
          labelKey: 'Menu.CartDiscounts.list',
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
          labelKey: 'Menu.DiscountCodes.list',
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
          labelKey: 'Menu.Discounts.add',
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
