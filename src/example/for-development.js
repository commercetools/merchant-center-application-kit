/**
 * THIS IS NOT THE MODULE ENTRY POINT!
 * This file is used by `react-script` to start the playground application
 * for testing/developing the `<ApplicationShell>` component.
 * The `<ApplicationShell>` component is however exported in `package.json`.
 */
import React from 'react';
import ReactDOM from 'react-dom';
// Use the "official" entry point as we would require the package
import ApplicationShell from '../main';
import * as i18n from '../../../../i18n';

const testMenuLinks = [
  {
    name: 'mcng-dashboard',
    menu: {
      name: 'Dashboard',
      link: 'dashboard',
      label: 'Menu.Dashboard.title',
      icon: 'SpeedometerIcon',
    },
  },
  {
    name: 'mcng-products',
    menu: {
      name: 'products',
      link: 'products',
      label: 'Menu.Products.title',
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
          label: 'Menu.Products.list',
          link: 'products',
        },
        {
          name: 'products-verify-changes',
          featureToggle: 'modifiedProducts',
          label: 'Menu.Products.verifyChanges',
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
          label: 'Menu.Products.pimSearchList',
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
          label: 'Menu.Products.add',
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
          label: 'Menu.Products.directAccess',
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
      label: 'Menu.Categories.title',
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
          label: 'Menu.Categories.list',
          link: 'categories?mode=list',
        },
        {
          name: 'categories-search',
          label: 'Menu.Categories.search',
          link: 'categories?mode=search',
        },
        {
          name: 'categories-add',
          label: 'Menu.Categories.add',
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
      label: 'Menu.Customers.title',
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
          label: 'Menu.Customers.list',
          link: 'customers',
        },
        {
          name: 'customers-add',
          label: 'Menu.Customers.add',
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
      label: 'Menu.Orders.title',
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
          label: 'Menu.Orders.list',
          link: 'orders',
        },
        {
          name: 'orders-add',
          label: 'Menu.Orders.add',
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
      label: 'Menu.Discounts.title',
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
          label: 'Menu.Discounts.ProductDiscounts.list',
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
          label: 'Menu.Discounts.CartDiscounts.list',
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
          label: 'Menu.Discounts.DiscountCodes.list',
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
          label: 'Menu.Discounts.add',
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

ReactDOM.render(
  <ApplicationShell
    i18n={i18n}
    configuration={window.app}
    menuLinks={testMenuLinks}
  >
    <div>{'This is the APPLICATION specific part'}</div>
  </ApplicationShell>,
  document.getElementById('app')
);
