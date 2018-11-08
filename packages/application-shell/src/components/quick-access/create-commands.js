import { oneLineTrim } from 'common-tags';
import messages from './messages';

const hasPermission = (permission, allPermissions) =>
  // canManageProject makes the user an admin (thereby giving every permission)
  allPermissions.canManageProject ||
  allPermissions[`canView${permission}`] ||
  allPermissions[`canManage${permission}`];

export default ({
  project,
  user,
  intl,
  featureToggles,
  projectDataLocale,
  changeProjectDataLocale,
}) =>
  [
    project && {
      id: 'go/dashboard',
      text: intl.formatMessage(messages.openDashboard),
      keywords: ['Go to Dashboard'],
      action: { type: 'go', to: `/${project.key}/dashboard` },
    },
    project &&
      hasPermission('Products', project.permissions) && {
        id: 'go/products',
        text: intl.formatMessage(messages.openProducts),
        keywords: ['Go to Products'],
        action: { type: 'go', to: `/${project.key}/products` },
        subCommands: [
          {
            id: 'go/products/list',
            text: intl.formatMessage(messages.openProductList),
            action: { type: 'go', to: `/${project.key}/products` },
          },
          {
            id: 'go/products/modified',
            text: intl.formatMessage(messages.openModifiedProducts),
            action: { type: 'go', to: `/${project.key}/products/modified` },
          },
          featureToggles.pimSearch && {
            id: 'go/products/pim-search',
            text: intl.formatMessage(messages.openPimSearch),
            action: { type: 'go', to: `/${project.key}/products/pim-search` },
          },
          {
            id: 'go/products/add',
            text: intl.formatMessage(messages.openAddProducts),
            action: { type: 'go', to: `/${project.key}/products/new` },
          },
        ].filter(Boolean),
      },
    project && {
      id: 'go/categories',
      text: intl.formatMessage(messages.openCategories),
      keywords: ['Go to Categories'],
      action: { type: 'go', to: `/${project.key}/categories` },
      subCommands: [
        {
          id: 'go/categories/list',
          text: intl.formatMessage(messages.openCategoriesList),
          action: { type: 'go', to: `/${project.key}/categories?mode=list` },
        },
        {
          id: 'go/categories/search',
          text: intl.formatMessage(messages.openCategoriesSearch),
          action: { type: 'go', to: `/${project.key}/categories?mode=search` },
        },
        {
          id: 'go/categories/add',
          text: intl.formatMessage(messages.openAddCategory),
          action: { type: 'go', to: `/${project.key}/categories/new` },
        },
      ],
    },
    project &&
      hasPermission('Customers', project.permissions) && {
        id: 'go/customers',
        text: intl.formatMessage(messages.openCustomers),
        keywords: ['Go to Customers'],
        action: { type: 'go', to: `/${project.key}/customers` },
        subCommands: [
          {
            id: 'go/customers/list',
            text: intl.formatMessage(messages.openCustomersList),
            action: { type: 'go', to: `/${project.key}/customers` },
          },
          {
            id: 'go/customers/new',
            text: intl.formatMessage(messages.openAddCustomer),
            action: { type: 'go', to: `/${project.key}/customers/new` },
          },
          {
            id: 'go/customer/customer-groups',
            text: intl.formatMessage(messages.openCustomerGroupsList),
            action: {
              type: 'go',
              to: `/${project.key}/customers/customer-groups`,
            },
          },
          {
            id: 'go/customers/customer-groups/add',
            text: intl.formatMessage(messages.openAddCustomerGroup),
            action: {
              type: 'go',
              to: `/${project.key}/customers/customer-groups/new`,
            },
          },
        ],
      },
    project &&
      hasPermission('Orders', project.permissions) && {
        id: 'go/orders',
        text: intl.formatMessage(messages.openOrders),
        keywords: ['Go to Orders'],
        action: { type: 'go', to: `/${project.key}/orders` },
        subCommands: [
          {
            id: 'go/orders/list',
            text: intl.formatMessage(messages.openOrdersList),
            action: { type: 'go', to: `/${project.key}/orders` },
          },
          {
            id: 'go/orders/add',
            text: intl.formatMessage(messages.openAddOrder),
            action: { type: 'go', to: `/${project.key}/orders/new` },
          },
        ],
      },
    project && {
      id: 'go/discounts',
      text: intl.formatMessage(messages.openDiscounts),
      keywords: ['Go to Discounts'],
      action: { type: 'go', to: `/${project.key}/discounts` },
      subCommands: [
        {
          id: 'go/discounts/products/list',
          text: intl.formatMessage(messages.openProductDiscountsList),
          action: { type: 'go', to: `/${project.key}/discounts/products` },
        },
        {
          id: 'go/discounts/carts/list',
          text: intl.formatMessage(messages.openCartDiscountsList),
          action: { type: 'go', to: `/${project.key}/discounts/carts` },
        },
        {
          id: 'go/discounts/codes/list',
          text: intl.formatMessage(messages.openDiscountCodesList),
          action: { type: 'go', to: `/${project.key}/discounts/codes` },
        },
        {
          id: 'go/discounts/add',
          text: intl.formatMessage(messages.openAddDiscount),
          action: { type: 'go', to: `/${project.key}/discounts/new` },
          subCommands: [
            {
              id: 'go/discounts/product/add',
              text: intl.formatMessage(messages.openAddProductDiscount),
              action: {
                type: 'go',
                to: `/${project.key}/discounts/products/new`,
              },
            },
            {
              id: 'go/discounts/cart/add',
              text: intl.formatMessage(messages.openAddCartDiscount),
              action: { type: 'go', to: `/${project.key}/discounts/carts/new` },
            },
            {
              id: 'go/discounts/code/add',
              text: intl.formatMessage(messages.openAddCartDiscount),
              action: { type: 'go', to: `/${project.key}/discounts/codes/new` },
            },
          ],
        },
      ],
    },
    project && {
      id: 'go/settings',
      text: intl.formatMessage(messages.openSettings),
      keywords: ['Go to Settings'],
      action: {
        type: 'go',
        to: `/${project.key}/settings/project/international`,
      },
      subCommands: [
        hasPermission('ProjectSettings', project.permissions) && {
          id: 'go/settings/project',
          text: intl.formatMessage(messages.openProjectSettings),
          action: { type: 'go', to: `/${project.key}/settings/project` },
          subCommands: [
            {
              id: 'go/settings/project/international',
              text: intl.formatMessage(
                messages.openProjectSettingsInternationalTab
              ),
              action: {
                type: 'go',
                to: `/${project.key}/settings/project/international`,
              },
            },
            {
              id: 'go/settings/project/taxes',
              text: intl.formatMessage(messages.openProjectSettingsTaxesTab),
              action: {
                type: 'go',
                to: `/${project.key}/settings/project/taxes`,
              },
            },
            {
              id: 'go/settings/project/shipping-methods',
              text: intl.formatMessage(
                messages.openProjectSettingsShippingMethodsTab
              ),
              action: {
                type: 'go',
                to: `/${project.key}/settings/project/shipping-methods`,
              },
            },
            {
              id: 'go/settings/project/channels',
              text: intl.formatMessage(messages.openProjectSettingsChannelsTab),
              action: {
                type: 'go',
                to: `/${project.key}/settings/project/channels`,
              },
            },
          ],
        },
        {
          id: 'go/settings/product-types',
          text: intl.formatMessage(messages.openProductTypesSettings),
          action: { type: 'go', to: `/${project.key}/settings/product-types` },
        },
        {
          id: 'go/settings/developer',
          text: intl.formatMessage(messages.openDeveloperSettings),
          action: {
            type: 'go',
            to: `/${project.key}/settings/developer/api-clients`,
          },
        },
      ].filter(Boolean),
    },
    project &&
      project.languages.length > 1 && {
        id: 'action/set-resource-language',
        text: intl.formatMessage(messages.setResourceLanguage),
        keywords: [
          'set resource locale',
          'set project data language',
          'set project data locale',
        ],
        // We would know these statically, but we define them here as we don't
        // want to include them in the top-level search results
        subCommands: async () =>
          project.languages.map(language => ({
            id: `action/set-resource-language/${language}`,
            text: oneLineTrim`
              ${language}
              ${language === projectDataLocale ? ' (active)' : ''}
            `,
            action: () => {
              changeProjectDataLocale(language);

              // We reload, since ProjectDataLocale is written in a way where
              // only the tree under the parent container reloads, but
              // not all of them reload.
              // So this action would seem like it had not effect, unless we
              // reload
              window.location.reload();
            },
          })),
      },
    {
      id: 'go/support',
      text: intl.formatMessage(messages.openSupport),
      keywords: ['Go to support'],
      action: {
        type: 'go',
        to:
          'https://jira.commercetools.com/servicedesk/customer/portal/1/create/99',
      },
    },
    {
      id: 'go/account-profile',
      text: intl.formatMessage(messages.openMyProfile),
      keywords: ['Go to user account', 'Go to profile', 'Open profile'],
      action: { type: 'go', to: `/account/profile` },
    },
    {
      id: 'go/privacy-policy',
      text: intl.formatMessage(messages.showPrivacyPolicy),
      keywords: ['Open Privacy Policy'],
      action: { type: 'go', to: 'https://commercetools.com/privacy' },
    },
    {
      id: 'go/logout',
      text: intl.formatMessage(messages.logout),
      keywords: ['Sign out'],
      action: { type: 'go', to: `/logout?reason=user` },
    },
    ...(user
      ? user.projects.results.map(userProject => ({
          id: `go/project(${userProject.key})`,
          text: intl.formatMessage(messages.useProject, {
            projectName: userProject.name,
          }),
          keywords: [userProject.key],
          action: () => {
            // Switching projects needs a full redirect so that
            // the feature flags are reloaded (and things caches get destroyed)
            window.location.href = `/${userProject.key}`;
          },
        }))
      : []),
  ].filter(Boolean);
