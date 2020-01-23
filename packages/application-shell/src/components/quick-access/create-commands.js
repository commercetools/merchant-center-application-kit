import { oneLineTrim } from 'common-tags';
import { hasSomePermissions } from '@commercetools-frontend/permissions';
import {
  LOGOUT_REASONS,
  SUPPORT_PORTAL_URL,
} from '@commercetools-frontend/constants';
import { permissions } from './constants';
import messages from './messages';

export default function createCommands({
  applicationContext,
  intl,
  featureToggles,
  changeProjectDataLocale,
}) {
  return [
    applicationContext.project &&
      applicationContext.permissions &&
      featureToggles.canViewDashboard &&
      hasSomePermissions(
        [permissions.ViewOrders],
        applicationContext.permissions
      ) && {
        id: 'go/dashboard',
        text: intl.formatMessage(messages.openDashboard),
        keywords: ['Go to Dashboard'],
        action: {
          type: 'go',
          to: `/${applicationContext.project.key}/dashboard`,
        },
      },
    applicationContext.project &&
      applicationContext.permissions &&
      hasSomePermissions(
        [permissions.ViewProducts],
        applicationContext.permissions
      ) && {
        id: 'go/products',
        text: intl.formatMessage(messages.openProducts),
        keywords: ['Go to Products'],
        action: {
          type: 'go',
          to: `/${applicationContext.project.key}/products`,
        },
        subCommands: [
          hasSomePermissions(
            [permissions.ViewProducts],
            applicationContext.permissions
          ) && {
            id: 'go/products/list',
            text: intl.formatMessage(messages.openProductList),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/products`,
            },
          },
          hasSomePermissions(
            [permissions.ViewProducts],
            applicationContext.permissions
          ) && {
            id: 'go/products/modified',
            text: intl.formatMessage(messages.openModifiedProducts),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/products/modified`,
            },
          },
          hasSomePermissions(
            [permissions.ViewProducts],
            applicationContext.permissions
          ) &&
            featureToggles.pimSearch && {
              id: 'go/products/pim-search',
              text: intl.formatMessage(messages.openPimSearch),
              action: {
                type: 'go',
                to: `/${applicationContext.project.key}/products/pim-search`,
              },
            },
          hasSomePermissions(
            [permissions.ManageProducts],
            applicationContext.permissions
          ) && {
            id: 'go/products/add',
            text: intl.formatMessage(messages.openAddProducts),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/products/new`,
            },
          },
        ].filter(Boolean),
      },
    applicationContext.project &&
      applicationContext.permissions &&
      hasSomePermissions(
        [permissions.ViewCategories],
        applicationContext.permissions
      ) && {
        id: 'go/categories',
        text: intl.formatMessage(messages.openCategories),
        keywords: ['Go to Categories'],
        action: {
          type: 'go',
          to: `/${applicationContext.project.key}/categories`,
        },
        subCommands: [
          hasSomePermissions(
            [permissions.ViewCategories],
            applicationContext.permissions
          ) && {
            id: 'go/categories/list',
            text: intl.formatMessage(messages.openCategoriesList),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/categories?mode=list`,
            },
          },
          hasSomePermissions(
            [permissions.ViewCategories],
            applicationContext.permissions
          ) && {
            id: 'go/categories/search',
            text: intl.formatMessage(messages.openCategoriesSearch),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/categories?mode=search`,
            },
          },
          hasSomePermissions(
            [permissions.ManageCategories],
            applicationContext.permissions
          ) && {
            id: 'go/categories/add',
            text: intl.formatMessage(messages.openAddCategory),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/categories/new`,
            },
          },
        ].filter(Boolean),
      },
    applicationContext.project &&
      applicationContext.permissions &&
      hasSomePermissions(
        [permissions.ViewCustomers, permissions.ViewCustomerGroups],
        applicationContext.permissions
      ) && {
        id: 'go/customers',
        text: intl.formatMessage(messages.openCustomers),
        keywords: ['Go to Customers'],
        action: {
          type: 'go',
          to: `/${applicationContext.project.key}/customers`,
        },
        subCommands: [
          hasSomePermissions(
            [permissions.ViewCustomers],
            applicationContext.permissions
          ) && {
            id: 'go/customers/list',
            text: intl.formatMessage(messages.openCustomersList),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/customers`,
            },
          },
          hasSomePermissions(
            [permissions.ManageCustomers],
            applicationContext.permissions
          ) && {
            id: 'go/customers/new',
            text: intl.formatMessage(messages.openAddCustomer),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/customers/new`,
            },
          },
          hasSomePermissions(
            [permissions.ViewCustomerGroups],
            applicationContext.permissions
          ) && {
            id: 'go/customer/customer-groups',
            text: intl.formatMessage(messages.openCustomerGroupsList),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/customers/customer-groups`,
            },
          },
          hasSomePermissions(
            [permissions.ManageCustomerGroups],
            applicationContext.permissions
          ) && {
            id: 'go/customers/customer-groups/add',
            text: intl.formatMessage(messages.openAddCustomerGroup),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/customers/customer-groups/new`,
            },
          },
        ].filter(Boolean),
      },
    applicationContext.project &&
      applicationContext.permissions &&
      hasSomePermissions(
        [permissions.ViewOrders],
        applicationContext.permissions
      ) && {
        id: 'go/orders',
        text: intl.formatMessage(messages.openOrders),
        keywords: ['Go to Orders'],
        action: { type: 'go', to: `/${applicationContext.project.key}/orders` },
        subCommands: [
          hasSomePermissions(
            [permissions.ViewOrders],
            applicationContext.permissions
          ) && {
            id: 'go/orders/list',
            text: intl.formatMessage(messages.openOrdersList),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/orders`,
            },
          },
          hasSomePermissions(
            [permissions.ManageOrders],
            applicationContext.permissions
          ) && {
            id: 'go/orders/add',
            text: intl.formatMessage(messages.openAddOrder),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/orders/new`,
            },
          },
        ].filter(Boolean),
      },
    applicationContext.project &&
      applicationContext.permissions &&
      hasSomePermissions(
        [
          permissions.ViewDiscountCodes,
          permissions.ViewProductDiscounts,
          permissions.ViewCartDiscounts,
        ],
        applicationContext.permissions
      ) && {
        id: 'go/discounts',
        text: intl.formatMessage(messages.openDiscounts),
        keywords: ['Go to Discounts'],
        action: {
          type: 'go',
          to: `/${applicationContext.project.key}/discounts`,
        },
        subCommands: [
          hasSomePermissions(
            [permissions.ViewProductDiscounts],
            applicationContext.permissions
          ) && {
            id: 'go/discounts/products/list',
            text: intl.formatMessage(messages.openProductDiscountsList),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/discounts/products`,
            },
          },
          hasSomePermissions(
            [permissions.ViewCartDiscounts],
            applicationContext.permissions
          ) && {
            id: 'go/discounts/carts/list',
            text: intl.formatMessage(messages.openCartDiscountsList),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/discounts/carts`,
            },
          },
          hasSomePermissions(
            [permissions.ViewDiscountCodes],
            applicationContext.permissions
          ) && {
            id: 'go/discounts/codes/list',
            text: intl.formatMessage(messages.openDiscountCodesList),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/discounts/codes`,
            },
          },
          hasSomePermissions(
            [
              permissions.ManageProductDiscounts,
              permissions.ManageDiscountCodes,
              permissions.ManageCartDiscounts,
            ],
            applicationContext.permissions
          ) && {
            id: 'go/discounts/add',
            text: intl.formatMessage(messages.openAddDiscount),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/discounts/new`,
            },
            subCommands: [
              hasSomePermissions(
                [permissions.ManageProductDiscounts],
                applicationContext.permissions
              ) && {
                id: 'go/discounts/product/add',
                text: intl.formatMessage(messages.openAddProductDiscount),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/discounts/products/new`,
                },
              },
              hasSomePermissions(
                [permissions.ManageCartDiscounts],
                applicationContext.permissions
              ) && {
                id: 'go/discounts/cart/add',
                text: intl.formatMessage(messages.openAddCartDiscount),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/discounts/carts/new`,
                },
              },
              hasSomePermissions(
                [permissions.ManageDiscountCodes],
                applicationContext.permissions
              ) && {
                id: 'go/discounts/code/add',
                text: intl.formatMessage(messages.openAddCartDiscount),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/discounts/codes/new`,
                },
              },
            ].filter(Boolean),
          },
        ].filter(Boolean),
      },
    applicationContext.project &&
      applicationContext.permissions &&
      hasSomePermissions(
        [
          permissions.ViewProjectSettings,
          permissions.ViewDeveloperSettings,
          permissions.ViewProductTypes,
        ],
        applicationContext.permissions
      ) && {
        id: 'go/settings',
        text: intl.formatMessage(messages.openSettings),
        keywords: ['Go to Settings'],
        action: {
          type: 'go',
          to: `/${applicationContext.project.key}/settings/project`,
        },
        subCommands: [
          hasSomePermissions(
            [
              permissions.ViewProjectSettings,
              permissions.ManageProjectSettings,
            ],
            applicationContext.permissions
          ) && {
            id: 'go/settings/project',
            text: intl.formatMessage(messages.openProjectSettings),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/settings/project`,
            },
            subCommands: [
              {
                id: 'go/settings/project/international',
                text: intl.formatMessage(
                  messages.openProjectSettingsInternationalTab
                ),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/settings/project/international`,
                },
              },
              {
                id: 'go/settings/project/taxes',
                text: intl.formatMessage(messages.openProjectSettingsTaxesTab),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/settings/project/taxes`,
                },
              },
              {
                id: 'go/settings/project/shipping-methods',
                text: intl.formatMessage(
                  messages.openProjectSettingsShippingMethodsTab
                ),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/settings/project/shipping-methods`,
                },
              },
              {
                id: 'go/settings/project/channels',
                text: intl.formatMessage(
                  messages.openProjectSettingsChannelsTab
                ),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/settings/project/channels`,
                },
              },
            ].filter(Boolean),
          },
          hasSomePermissions(
            [permissions.ViewProductTypes],
            applicationContext.permissions
          ) && {
            id: 'go/settings/product-types',
            text: intl.formatMessage(messages.openProductTypesSettings),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/settings/product-types`,
            },
          },
          hasSomePermissions(
            [permissions.ViewDeveloperSettings],
            applicationContext.permissions
          ) && {
            id: 'go/settings/developer',
            text: intl.formatMessage(messages.openDeveloperSettings),
            action: {
              type: 'go',
              to: `/${applicationContext.project.key}/settings/developer`,
            },
            subCommands: [
              hasSomePermissions(
                [permissions.ViewDeveloperSettings],
                applicationContext.permissions
              ) && {
                id: 'go/settings/developer/api-clients/list',
                text: intl.formatMessage(messages.openApiClientsList),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/settings/developer/api-clients`,
                },
              },
              hasSomePermissions(
                [permissions.ManageDeveloperSettings],
                applicationContext.permissions
              ) && {
                id: 'go/settings/developer/api-clients/add',
                text: intl.formatMessage(messages.openAddApiClient),
                action: {
                  type: 'go',
                  to: `/${applicationContext.project.key}/settings/developer/api-clients/new`,
                },
              },
            ].filter(Boolean),
          },
          featureToggles.customApplications &&
            hasSomePermissions(
              [permissions.ManageProjectSettings],
              applicationContext.permissions
            ) && {
              id: 'go/settings/custom-applications',
              text: intl.formatMessage(messages.openCustomApplicationsSettings),
              action: {
                type: 'go',
                to: `/${applicationContext.project.key}/settings/custom-applications`,
              },
            },
        ].filter(Boolean),
      },
    applicationContext.project &&
      applicationContext.project.languages &&
      applicationContext.project.languages.length > 1 && {
        id: 'action/set-resource-language',
        text: intl.formatMessage(messages.setResourceLanguage),
        keywords: [
          'set resource locale',
          'set project data language',
          'set project data locale',
        ],
        // We would know these statically, but we define them here as we don't
        // want to include them in the top-level search results
        subCommands: () =>
          applicationContext.project.languages.map(language => ({
            id: `action/set-resource-language/${language}`,
            text: oneLineTrim`
              ${language}
              ${language === applicationContext.dataLocale ? ' (active)' : ''}
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
        to: SUPPORT_PORTAL_URL,
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
    {
      id: 'go/manage-projects',
      text: intl.formatMessage(messages.openManageProjects),
      keywords: [
        'Go to manage projects',
        'Go to projects',
        'Open projects list',
      ],
      action: { type: 'go', to: `/account/projects` },
    },
    {
      id: 'go/manage-organizations',
      text: intl.formatMessage(messages.openManageOrganizations),
      keywords: [
        'Go to manage organizations',
        'Go to organizations',
        'Open organizations list',
      ],
      action: { type: 'go', to: `/account/organizations` },
    },
    ...(applicationContext.user
      ? applicationContext.user.projects.results.map(userProject => ({
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
}
