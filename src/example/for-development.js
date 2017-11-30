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
    name: 'mcng-orders',
    menu: {
      name: 'Orders',
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
          name: 'Orders',
          label: 'Menu.Orders.list',
          link: 'orders',
        },
        {
          name: 'AddOrders',
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
