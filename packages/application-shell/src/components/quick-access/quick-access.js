import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { injectFeatureToggles } from '@flopflip/react-broadcast';
import { withApollo } from 'react-apollo';
import { oneLineTrim } from 'common-tags';
import debounce from 'debounce-async';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  hasSomePermissions,
  permissions,
} from '@commercetools-frontend/permissions';
import Butler from './butler';
import QuickAccessQuery from './quick-access.graphql';
import createCommands from './create-commands';
import { sanitize, translate } from './utils';
import {
  createProductTabsSubCommands,
  createProductVariantSubCommands,
} from './sub-commands';
import messages from './messages';
import { saveHistory, loadHistory } from './history';

const containsMatchByProductId = data => Boolean(data.productById);
const containsMatchByProductKey = data => Boolean(data.productByKey);
const containsMatchByVariantKey = data => Boolean(data.productByVariantKey);
const containsMatchByVariantSku = data => Boolean(data.productByVariantSku);

class QuickAccess extends React.Component {
  static displayName = 'QuickAccess';
  static propTypes = {
    project: PropTypes.shape({
      key: PropTypes.string.isRequired,
      languages: PropTypes.arrayOf(PropTypes.string).isRequired,
      permissions: PropTypes.object.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    client: PropTypes.object.isRequired,
    user: PropTypes.shape({
      projects: PropTypes.shape({
        results: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ).isRequired,
      }).isRequired,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    featureToggles: PropTypes.shape({
      // testFeatureFlag: PropTypes.bool,
      pimSearch: PropTypes.bool,
      // customerGroups: PropTypes.bool,
      // userProfile: PropTypes.bool,
      // addOrder: PropTypes.bool,
      // rcTable: PropTypes.bool,
      // projectSettings: PropTypes.bool,
      // cartDiscountRuleBuilder: PropTypes.bool,
      // orderReturnInfo: PropTypes.bool,
      // productTypesAdministration: PropTypes.bool,
      // projectSettingInternational: PropTypes.bool,
      // projectSettingTaxCategories: PropTypes.bool,
      // projectSettingShippingMethods: PropTypes.bool,
      // dashboardData: PropTypes.bool,
      // productPriceTears: PropTypes.bool,
      // createCodesWithinCartDiscountDetails: PropTypes.bool,
      // extendedRuleBuilderDropdown: PropTypes.bool,
      // discountsBulkSelectionStatus: PropTypes.bool,
      // developerSettings: PropTypes.bool,
      // developerSettingsApiClients: PropTypes.bool,
      // canPublishProducts: PropTypes.bool,
      // projectsList: PropTypes.bool,
      // organizationsList: PropTypes.bool,
      // teamsList: PropTypes.bool,
      // orderSummaryPanel: PropTypes.string,
      // userLocaleEs: PropTypes.bool,
      // duplicateOrder: PropTypes.bool,
      // projectExtensions: PropTypes.bool,
      // canEditPrices: PropTypes.bool,
      // projectSettingsChannels: PropTypes.bool,
      // savedOrdersListViews: PropTypes.bool,
      // canViewOrders: PropTypes.bool,
      // canViewCategories: PropTypes.bool,
      // canViewDashboard: PropTypes.bool,
      // canViewDiscounts: PropTypes.bool,
    }).isRequired,
    projectDataLocale: PropTypes.string,
    onChangeProjectDataLocale: PropTypes.func,
  };

  state = {
    history: loadHistory(),
  };

  componentWillUnmount() {
    saveHistory(this.state.history);
  }

  query = (Query, variables) =>
    this.props.client
      .query({
        query: Query,
        errorPolicy: 'ignore',
        variables,
      })
      .then(response => response.data);

  getNextCommands = async command => {
    if (!command.subCommands) return [];
    if (Array.isArray(command.subCommands)) return command.subCommands;
    return command.subCommands(this.query);
  };

  getProjectCommands = debounce(
    searchText =>
      this.query(QuickAccessQuery, {
        searchText: sanitize(searchText),
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        // Pass conditional arguments to disable some of the queries
        canViewProducts: hasSomePermissions(
          [permissions.ViewProducts, permissions.ManageProducts],
          this.props.project.permissions
        ),
      }).then(data => {
        const commands = [];

        if (containsMatchByVariantKey(data)) {
          const productId = data.productByVariantKey.id;
          const variantId =
            data.productByVariantKey.masterData.staged.variant.id;
          commands.push({
            id: `go/product-variant-by-key/product(${productId}/variant(${variantId})`,
            text: this.props.intl.formatMessage(messages.showProductVariant, {
              variantName: translate(
                data.productByVariantKey.masterData.staged.nameAllLocales,
                this.props.projectDataLocale
              ),
            }),
            keywords: [data.productByVariantKey.masterData.staged.variant.key],
            action: {
              type: 'go',
              to: `/${
                this.props.project.key
              }/products/${productId}/${variantId}`,
            },
            subCommands: createProductVariantSubCommands({
              intl: this.props.intl,
              project: this.props.project,
              productId,
              variantId,
            }),
          });
        }
        if (containsMatchByVariantSku(data)) {
          const productId = data.productByVariantSku.id;
          const variantId =
            data.productByVariantSku.masterData.staged.variant.id;
          commands.push({
            id: `go/product-variant-by-sku/product(${productId})/variant(${variantId})`,
            text: this.props.intl.formatMessage(messages.showProductVariant, {
              variantName:
                data.productByVariantSku.masterData.staged.variant.sku,
            }),
            action: {
              type: 'go',
              to: oneLineTrim`
              /${this.props.project.key}
              /products
              /${productId}
              /${variantId}
            `,
            },
            subCommands: createProductVariantSubCommands({
              intl: this.props.intl,
              project: this.props.project,
              productId,
              variantId,
            }),
          });
        }
        if (containsMatchByProductId(data)) {
          const productId = data.productById.id;
          commands.push({
            id: `go/product-by-id/product(${productId})`,
            text: this.props.intl.formatMessage(messages.showProduct, {
              productName: translate(
                data.productById.masterData.staged.nameAllLocales,
                this.props.projectDataLocale
              ),
            }),
            keywords: [productId],
            action: {
              type: 'go',
              to: `/${this.props.project.key}/products/${productId}`,
            },
            subCommands: createProductTabsSubCommands({
              intl: this.props.intl,
              project: this.props.project,
              productId,
            }),
          });
        }
        if (containsMatchByProductKey(data)) {
          const productId = data.productByKey.id;
          commands.push({
            id: `go/product-by-key/product(${productId})`,
            text: this.props.intl.formatMessage(messages.showProduct, {
              productName: data.productByKey.key,
            }),
            action: {
              type: 'go',
              to: `/${this.props.project.key}/products/${productId}`,
            },
            subCommands: createProductTabsSubCommands({
              intl: this.props.intl,
              project: this.props.project,
              productId,
            }),
          });
        }

        return commands;
      }),
    200,
    { cancelObj: 'canceled' }
  );

  search = async searchText => {
    const generalCommands = createCommands({
      project: this.props.project,
      projectDataLocale: this.props.projectDataLocale,
      changeProjectDataLocale: this.props.onChangeProjectDataLocale,
      user: this.props.user,
      intl: this.props.intl,
      featureToggles: this.props.featureToggles,
    });

    if (!this.props.project) return generalCommands;

    // Avoid searching for short texts, as we won't get any good results
    // anyways. This results in commands popping up immediately when the user
    // starts typing, which gives the whole search a much more repsonsive
    // feeling.
    if (searchText.trim().length < 3) return generalCommands;

    try {
      const projectCommands = await this.getProjectCommands(searchText);
      return [...generalCommands, ...projectCommands];
    } catch (error) {
      // When the debounced search is canceled, it throws with "canceled"
      // In that case we know that another search is going to happen
      // and we just resolve with the general commands.
      if (error === 'canceled') return generalCommands;
      throw error;
    }
  };

  executeCommand = (command, meta) => {
    if (typeof command.action === 'object') {
      if (command.action.type === 'go') {
        // open in new window
        // and always open other pages in a new window
        if (meta.openInNewTab || !command.action.to.startsWith('/')) {
          open(command.action.to, '_blank');
        } else {
          this.props.history.push(command.action.to);
        }
      }
    }
    if (typeof command.action === 'function') {
      // Idea: We could handle these errors and set them on status bar of Butler
      // We can also handle sync/async commands by checking command.action.then
      command.action();
    }
  };

  render() {
    return (
      <Butler
        history={this.state.history}
        onHistoryChange={history => this.setState({ history })}
        search={this.search}
        executeCommand={this.executeCommand}
        onClose={this.props.onClose}
        getNextCommands={this.getNextCommands}
      />
    );
  }
}

export default compose(
  withApollo,
  injectIntl,
  injectFeatureToggles([
    // TODO figure out which feature toggles we need to use
    // 'testFeatureFlag',
    'pimSearch',
    // 'customerGroups',
    // 'userProfile',
    // 'addOrder',
    // 'rcTable',
    // 'projectSettings',
    // 'cartDiscountRuleBuilder',
    // 'orderReturnInfo',
    // 'productTypesAdministration',
    // 'projectSettingInternational',
    // 'projectSettingTaxCategories',
    // 'projectSettingShippingMethods',
    // 'dashboardData',
    // 'productPriceTears',
    // 'createCodesWithinCartDiscountDetails',
    // 'extendedRuleBuilderDropdown',
    // 'discountsBulkSelectionStatus',
    // 'developerSettings',
    // 'developerSettingsApiClients',
    // 'canPublishProducts',
    // 'projectsList',
    // 'organizationsList',
    // 'teamsList',
    // 'orderSummaryPanel',
    // 'userLocaleEs',
    // 'duplicateOrder',
    // 'projectExtensions',
    // 'canEditPrices',
    // 'projectSettingsChannels',
    // 'savedOrdersListViews',
    // 'canViewOrders',
    // 'canViewCategories',
    // 'canViewDashboard',
    // 'canViewDiscounts',
  ])
)(QuickAccess);
