import React from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { injectFeatureToggles } from '@flopflip/react-broadcast';
import { withApollo } from 'react-apollo';
import { actions as sdkActions } from '@commercetools-frontend/sdk';
import { oneLineTrim } from 'common-tags';
import debounce from 'debounce-async';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { hasSomePermissions } from '@commercetools-frontend/permissions';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Butler from './butler';
import QuickAccessQuery from './quick-access.graphql';
import createCommands from './create-commands';
import { sanitize, translate } from './utils';
import {
  createProductTabsSubCommands,
  createProductVariantSubCommands,
} from './sub-commands';
import messages from './messages';
import { saveHistoryEntries, loadHistoryEntries } from './history-entries';
import pimIndexerStates from './pim-indexer-states';

const containsMatchByProductId = data => Boolean(data && data.productById);
const containsMatchesByProducstIds = data =>
  Boolean(data && data.productsByIds);
const containsMatchByProductKey = data => Boolean(data && data.productByKey);
const containsMatchByVariantKey = data =>
  Boolean(data && data.productByVariantKey);
const containsMatchByVariantSku = data =>
  Boolean(data && data.productByVariantSku);

class QuickAccess extends React.Component {
  static displayName = 'QuickAccess';
  static propTypes = {
    pimIndexerState: PropTypes.oneOf(['UNCHECKED', 'INDEXED', 'NOT_INDEXED'])
      .isRequired,
    onPimIndexerStateChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    pimSearchProductIds: PropTypes.func.isRequired,
    getPimSearchStatus: PropTypes.func.isRequired,
    onChangeProjectDataLocale: PropTypes.func,
    // withRouter
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    // withApollo
    client: PropTypes.object.isRequired,
    // injectIntl
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    // injectFeatureToggles
    featureToggles: PropTypes.shape({
      pimSearch: PropTypes.bool,
      customApplications: PropTypes.bool,
      canViewDashboard: PropTypes.bool,
    }).isRequired,
    // withApplicationContext
    applicationContext: PropTypes.shape({
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
      project: PropTypes.shape({
        key: PropTypes.string.isRequired,
        languages: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
      permissions: PropTypes.object,
      dataLocale: PropTypes.string,
      environment: PropTypes.shape({
        useFullRedirectsForLinks: PropTypes.bool,
      }),
    }).isRequired,
  };

  state = {
    historyEntries: loadHistoryEntries(),
  };

  componentDidMount() {
    if (this.props.pimIndexerState === pimIndexerStates.UNCHECKED) {
      this.getProjectIndexStatus().then(pimIndexerState =>
        this.props.onPimIndexerStateChange(pimIndexerState)
      );
    }
  }

  componentWillUnmount() {
    saveHistoryEntries(this.state.historyEntries);
  }

  // This function is written with the assumption that a project (including the
  // existence of a project) never changes without a full page reload.
  // Otherwise we'd need to
  // - ensure the response we receive belongs to the current project
  // - refetch the pim search info when the project key changes
  getProjectIndexStatus = async () => {
    // skip when there is no project
    if (!this.props.applicationContext.project)
      return pimIndexerStates.NOT_INDEXED;

    const canViewProducts = hasSomePermissions(
      ['ViewProducts', 'ManageProducts'],
      this.props.applicationContext.permissions
    );

    // skip checking when user can't view products anyways
    if (!canViewProducts) return pimIndexerStates.NOT_INDEXED;

    return this.props.getPimSearchStatus();
  };

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
    async searchText => {
      const idsOfProductsMatchingSearchText =
        this.props.pimIndexerState === pimIndexerStates.INDEXED
          ? await this.props.pimSearchProductIds(searchText)
          : [];

      const canViewProducts = hasSomePermissions(
        ['ViewProducts', 'ManageProducts'],
        this.props.applicationContext.permissions
      );

      return this.query(QuickAccessQuery, {
        searchText: sanitize(searchText),
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        // Pass conditional arguments to disable some of the queries
        canViewProducts,
        productsWhereClause: `id in (${idsOfProductsMatchingSearchText
          .map(id => JSON.stringify(id))
          .join(', ')})`,
        includeProductsByIds: Boolean(
          canViewProducts && idsOfProductsMatchingSearchText.length > 0
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
                this.props.applicationContext.dataLocale
              ),
            }),
            keywords: [data.productByVariantKey.masterData.staged.variant.key],
            action: {
              type: 'go',
              to: `/${this.props.applicationContext.project.key}/products/${productId}/${variantId}`,
            },
            subCommands: createProductVariantSubCommands({
              intl: this.props.intl,
              applicationContext: this.props.applicationContext,
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
                /${this.props.applicationContext.project.key}
                /products
                /${productId}
                /${variantId}
              `,
            },
            subCommands: createProductVariantSubCommands({
              intl: this.props.intl,
              applicationContext: this.props.applicationContext,
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
                this.props.applicationContext.dataLocale
              ),
            }),
            keywords: [productId],
            action: {
              type: 'go',
              to: `/${this.props.applicationContext.project.key}/products/${productId}`,
            },
            subCommands: createProductTabsSubCommands({
              intl: this.props.intl,
              applicationContext: this.props.applicationContext,
              productId,
            }),
          });
        }
        if (containsMatchesByProducstIds(data)) {
          data.productsByIds.results.forEach(product => {
            commands.push({
              id: `go/product-by-search-text/product(${product.id})`,
              text: this.props.intl.formatMessage(messages.showProduct, {
                productName: translate(
                  product.masterData.staged.nameAllLocales,
                  this.props.applicationContext.dataLocale
                ),
              }),
              keywords: [product.id],
              action: {
                type: 'go',
                to: `/${this.props.applicationContext.project.key}/products/${product.id}`,
              },
              subCommands: createProductTabsSubCommands({
                intl: this.props.intl,
                applicationContext: this.props.applicationContext,
                productId: product.id,
              }),
            });
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
              to: `/${this.props.applicationContext.project.key}/products/${productId}`,
            },
            subCommands: createProductTabsSubCommands({
              intl: this.props.intl,
              applicationContext: this.props.applicationContext,
              productId,
            }),
          });
        }

        return commands;
      });
    },
    200,
    { cancelObj: 'canceled' }
  );

  search = async searchText => {
    const generalCommands = createCommands({
      applicationContext: this.props.applicationContext,
      changeProjectDataLocale: this.props.onChangeProjectDataLocale,
      intl: this.props.intl,
      featureToggles: this.props.featureToggles,
    });

    if (!this.props.applicationContext.project) return generalCommands;

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
        } else if (
          this.props.applicationContext.environment &&
          this.props.applicationContext.environment.useFullRedirectsForLinks
        ) {
          window.location.replace(command.action.to);
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
        intl={this.props.intl}
        historyEntries={this.state.historyEntries}
        onHistoryEntriesChange={historyEntries =>
          this.setState({ historyEntries })
        }
        search={this.search}
        executeCommand={this.executeCommand}
        onClose={this.props.onClose}
        getNextCommands={this.getNextCommands}
      />
    );
  }
}

export default flowRight(
  withApollo,
  injectIntl,
  withRouter,
  injectFeatureToggles(['pimSearch', 'customApplications', 'canViewDashboard']),
  withApplicationContext(),
  connect(
    null,
    (dispatch, ownProps) => ({
      pimSearchProductIds: searchText =>
        dispatch(
          sdkActions.post({
            uri: `/proxy/pim-search/${ownProps.applicationContext.project.key}/search/products`,
            payload: {
              query: {
                fullText: {
                  field: 'name',
                  language: ownProps.applicationContext.dataLocale,
                  value: searchText,
                },
              },
              sort: [
                {
                  field: 'name',
                  language: ownProps.applicationContext.dataLocale,
                  order: 'desc',
                },
              ],
              limit: 9,
              offset: 0,
            },
          })
        ).then(result =>
          result && result.hits ? result.hits.map(hit => hit.id) : []
        ),
      getPimSearchStatus: () =>
        dispatch(
          // TODO this should be sdkActions.head()
          // and then we should check whether the response code is
          // - 200 meaning the project is indexed
          // - 404 meaning the project is not indexed
          //
          // But there is a problem in tne node-sdk client as it tries to
          // .json()-parse the response to HEAD requests which results in an
          // error, so we send a regular request for now and limit to no results
          // instead to keep the payload minimal
          sdkActions.post({
            uri: `/proxy/pim-search/${ownProps.applicationContext.project.key}/search/products`,
            payload: {
              query: {
                fullText: {
                  field: 'name',
                  language: ownProps.applicationContext.dataLocale,
                  value: 'availability-check',
                },
              },
              limit: 0,
              offset: 0,
            },
          })
        ).then(
          () => pimIndexerStates.INDEXED,
          // project is not using pim-indexer when response error code is 404,
          // but we treat all errors as non-indexed as a safe guard, so we're
          // not checking the response error code at all
          () => pimIndexerStates.NOT_INDEXED
        ),
    })
  )
)(QuickAccess);
