import { oneLineTrim } from 'common-tags';
import {
  hasPermission,
  hasSomePermissions,
  permissions,
} from '@commercetools-frontend/permissions';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import messages from './messages';

export default ({
  project,
  user,
  intl,
  featureToggles,
  projectDataLocale,
  changeProjectDataLocale,
}) =>
  [
    project &&
      featureToggles.canViewDashboard &&
      hasSomePermissions(
        [
          permissions.ViewProducts,
          permissions.ManageProducts,
          permissions.ViewOrders,
          permissions.ManageOrders,
        ],
        project.permissions
      ) && {
        id: 'go/dashboard',
        text: intl.formatMessage(messages.openDashboard),
        keywords: ['Go to Dashboard'],
        action: { type: 'go', to: `/${project.key}/dashboard` },
      },
    project &&
      hasSomePermissions(
        [permissions.ViewProducts, permissions.ManageProducts],
        project.permissions
      ) && {
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
          hasPermission(permissions.ManageProducts, project.permissions) && {
            id: 'go/products/add',
            text: intl.formatMessage(messages.openAddProducts),
            action: { type: 'go', to: `/${project.key}/products/new` },
          },
        ].filter(Boolean),
      },
    project &&
      featureToggles.canViewCategories &&
      hasSomePermissions(
        [permissions.ViewProducts, permissions.ManageProducts],
        project.permissions
      ) && {
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
            action: {
              type: 'go',
              to: `/${project.key}/categories?mode=search`,
            },
          },
          hasPermission(permissions.ManageProducts, project.permissions) && {
            id: 'go/categories/add',
            text: intl.formatMessage(messages.openAddCategory),
            action: { type: 'go', to: `/${project.key}/categories/new` },
          },
        ],
      },
    project &&
      hasSomePermissions(
        [permissions.ViewCustomers, permissions.ManageCustomers],
        project.permissions
      ) && {
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
          hasPermission(permissions.ManageCustomers, project.permissions) && {
            id: 'go/customers/new',
            text: intl.formatMessage(messages.openAddCustomer),
            action: { type: 'go', to: `/${project.key}/customers/new` },
          },
          featureToggles.customerGroups && {
            id: 'go/customer/customer-groups',
            text: intl.formatMessage(messages.openCustomerGroupsList),
            action: {
              type: 'go',
              to: `/${project.key}/customers/customer-groups`,
            },
          },
          featureToggles.customerGroups &&
            hasPermission(permissions.ManageCustomers, project.permissions) && {
              id: 'go/customers/customer-groups/add',
              text: intl.formatMessage(messages.openAddCustomerGroup),
              action: {
                type: 'go',
                to: `/${project.key}/customers/customer-groups/new`,
              },
            },
        ].filter(Boolean),
      },
    project &&
      featureToggles.canViewOrders &&
      hasSomePermissions(
        [permissions.ViewOrders, permissions.ManageOrders],
        project.permissions
      ) && {
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
          hasPermission(permissions.ManageOrders, project.permissions) && {
            id: 'go/orders/add',
            text: intl.formatMessage(messages.openAddOrder),
            action: { type: 'go', to: `/${project.key}/orders/new` },
          },
        ].filter(Boolean),
      },
    project &&
      featureToggles.canViewDiscounts &&
      hasSomePermissions(
        [
          permissions.ViewProducts,
          permissions.ManageProducts,
          permissions.ViewOrders,
          permissions.ManageOrders,
        ],
        project.permissions
      ) && {
        id: 'go/discounts',
        text: intl.formatMessage(messages.openDiscounts),
        keywords: ['Go to Discounts'],
        action: { type: 'go', to: `/${project.key}/discounts` },
        subCommands: [
          hasSomePermissions(
            [permissions.ViewProducts, permissions.ManageProducts],
            project.permissions
          ) && {
            id: 'go/discounts/products/list',
            text: intl.formatMessage(messages.openProductDiscountsList),
            action: { type: 'go', to: `/${project.key}/discounts/products` },
          },
          hasSomePermissions(
            [permissions.ViewOrders, permissions.ManageOrders],
            project.permissions
          ) && {
            id: 'go/discounts/carts/list',
            text: intl.formatMessage(messages.openCartDiscountsList),
            action: { type: 'go', to: `/${project.key}/discounts/carts` },
          },
          hasSomePermissions(
            [permissions.ViewOrders, permissions.ManageOrders],
            project.permissions
          ) && {
            id: 'go/discounts/codes/list',
            text: intl.formatMessage(messages.openDiscountCodesList),
            action: { type: 'go', to: `/${project.key}/discounts/codes` },
          },
          hasSomePermissions(
            [
              permissions.ViewProducts,
              permissions.ManageProducts,
              permissions.ViewOrders,
              permissions.ManageOrders,
            ],
            project.permissions
          ) && {
            id: 'go/discounts/add',
            text: intl.formatMessage(messages.openAddDiscount),
            action: { type: 'go', to: `/${project.key}/discounts/new` },
            subCommands: [
              hasPermission(
                permissions.ManageProducts,
                project.permissions
              ) && {
                id: 'go/discounts/product/add',
                text: intl.formatMessage(messages.openAddProductDiscount),
                action: {
                  type: 'go',
                  to: `/${project.key}/discounts/products/new`,
                },
              },
              hasPermission(permissions.ManageOrders, project.permissions) && {
                id: 'go/discounts/cart/add',
                text: intl.formatMessage(messages.openAddCartDiscount),
                action: {
                  type: 'go',
                  to: `/${project.key}/discounts/carts/new`,
                },
              },
              hasPermission(permissions.ManageOrders, project.permissions) && {
                id: 'go/discounts/code/add',
                text: intl.formatMessage(messages.openAddCartDiscount),
                action: {
                  type: 'go',
                  to: `/${project.key}/discounts/codes/new`,
                },
              },
            ].filter(Boolean),
          },
        ].filter(Boolean),
      },
    project &&
      featureToggles.projectSettings &&
      hasSomePermissions(
        [
          permissions.ManageProject,
          permissions.ViewProducts,
          permissions.ManageProducts,
        ],
        project.permissions
      ) && {
        id: 'go/settings',
        text: intl.formatMessage(messages.openSettings),
        keywords: ['Go to Settings'],
        action: {
          type: 'go',
          to: `/${project.key}/settings/project/international`,
        },
        subCommands: [
          hasPermission(permissions.ManageProject, project.permissions) && {
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
              featureToggles.projectSettingsChannels && {
                id: 'go/settings/project/channels',
                text: intl.formatMessage(
                  messages.openProjectSettingsChannelsTab
                ),
                action: {
                  type: 'go',
                  to: `/${project.key}/settings/project/channels`,
                },
              },
            ].filter(Boolean),
          },
          {
            id: 'go/settings/product-types',
            text: intl.formatMessage(messages.openProductTypesSettings),
            action: {
              type: 'go',
              to: `/${project.key}/settings/product-types`,
            },
          },
          featureToggles.developerSettings &&
            hasPermission(permissions.ManageProject, project.permissions) && {
              id: 'go/settings/developer',
              text: intl.formatMessage(messages.openDeveloperSettings),
              action: {
                type: 'go',
                to: `/${project.key}/settings/developer/api-clients`,
              },
            },
          featureToggles.customApplicationsSettings &&
            hasPermission(permissions.ManageProject, project.permissions) && {
              id: 'go/settings/custom-applications',
              text: intl.formatMessage(messages.openCustomApplicationsSettings),
              action: {
                type: 'go',
                to: `/${project.key}/settings/custom-applications`,
              },
            },
        ].filter(Boolean),
      },
    project &&
      project.languages &&
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
      action: { type: 'go', to: 'https://commercetools.com/privacy#suppliers' },
    },
    {
      id: 'go/logout',
      text: intl.formatMessage(messages.logout),
      keywords: ['Sign out'],
      action: { type: 'go', to: `/logout?reason=${LOGOUT_REASONS.USER}` },
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
