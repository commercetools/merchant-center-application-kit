import { useCallback, useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { useFeatureToggles } from '@flopflip/react-broadcast';
import { oneLineTrim } from 'common-tags';
import debounce from 'debounce-async';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  GRAPHQL_TARGETS,
  MC_API_PROXY_TARGETS,
} from '@commercetools-frontend/constants';
import { hasSomePermissions } from '@commercetools-frontend/permissions';
import {
  actions as sdkActions,
  useAsyncDispatch,
} from '@commercetools-frontend/sdk';
import type { TQuickAccessQuery } from '../../types/generated/ctp';
import { location } from '../../utils/location';
import Butler from './butler';
import { permissions } from './constants';
import createCommands from './create-commands';
import { saveHistoryEntries, loadHistoryEntries } from './history-entries';
import messages from './messages';
import pimIndexerStates from './pim-indexer-states';
import QuickAccessQuery from './quick-access.ctp.graphql';
import {
  createProductTabsSubCommands,
  createProductVariantSubCommands,
} from './sub-commands';
import type { ExecGraphQlQuery, Command, HistoryEntry } from './types';
import { actionTypes } from './types';
import { sanitize, translate, flattenCommands } from './utils';

const searchProductIdsAction = (
  searchText: string,
  projectKey: string,
  dataLocale: string
) =>
  sdkActions.post({
    uri: `/${projectKey}/search/products`,
    mcApiProxyTarget: MC_API_PROXY_TARGETS.PIM_SEARCH,
    payload: {
      query: {
        fullText: {
          field: 'name',
          language: dataLocale,
          value: searchText,
        },
      },
      sort: [
        {
          field: 'name',
          language: dataLocale,
          order: 'desc',
        },
      ],
      limit: 9,
      offset: 0,
    },
  });
const pimIndexerStatusAction = (projectKey: string, dataLocale: string) =>
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
    uri: `/${projectKey}/search/products`,
    mcApiProxyTarget: MC_API_PROXY_TARGETS.PIM_SEARCH,
    payload: {
      query: {
        fullText: {
          field: 'name',
          language: dataLocale,
          value: 'availability-check',
        },
      },
      limit: 0,
      offset: 0,
    },
  });

type FetchProductIdsResult = { hits?: { id: string }[] } | undefined;
type Props = {
  pimIndexerState: keyof typeof pimIndexerStates;
  onPimIndexerStateChange: (
    pimIndexerState: keyof typeof pimIndexerStates
  ) => void;
  onClose: () => void;
  onChangeProjectDataLocale?: (locale: string) => void;
};

const QuickAccess = (props: Props) => {
  const [historyEntries, setHistoryEntries] = useState(loadHistoryEntries());
  const handleHistoryEntriesChange = useCallback<
    (historyEntries: HistoryEntry[]) => void
  >((entries) => {
    // Keep the history in sync with the session storage
    saveHistoryEntries(entries);
    setHistoryEntries(entries);
  }, []);
  const history = useHistory();
  const apolloClient = useApolloClient();
  const intl = useIntl();
  const [
    isPimSearchEnabled,
    isCustomApplicationsEnabled,
    isCanViewDashboardEnabled,
  ] = useFeatureToggles({
    pimSearch: true,
    customApplications: true,
    canViewDashboard: true,
  });
  const applicationContext = useApplicationContext<{
    useFullRedirectsForLinks?: boolean;
  }>();

  // Destructure functions from props to reference them in the hook dependency list
  const { onPimIndexerStateChange: onPimIndexerStateChangeFromParent } = props;

  const dispatchFetchProductIds = useAsyncDispatch<
    ReturnType<typeof searchProductIdsAction>,
    FetchProductIdsResult
  >();
  const fetchPimSearchProductIds = useCallback<
    (searchText: string) => Promise<string[]>
  >(
    async (searchText) => {
      if (applicationContext.project && applicationContext.dataLocale) {
        const result = await dispatchFetchProductIds(
          searchProductIdsAction(
            searchText,
            applicationContext.project.key,
            applicationContext.dataLocale
          )
        );
        return result && result.hits ? result.hits.map((hit) => hit.id) : [];
      }
      return [];
    },
    [
      applicationContext.dataLocale,
      applicationContext.project,
      dispatchFetchProductIds,
    ]
  );

  const dispatchFetchPimIndexerStatus = useAsyncDispatch<
    ReturnType<typeof pimIndexerStatusAction>,
    unknown
  >();
  const fetchPimIndexerStatus = useCallback<
    () => Promise<
      | (typeof pimIndexerStates)['INDEXED']
      | (typeof pimIndexerStates)['NOT_INDEXED']
    >
  >(async () => {
    if (applicationContext.project && applicationContext.dataLocale) {
      try {
        dispatchFetchPimIndexerStatus(
          pimIndexerStatusAction(
            applicationContext.project.key,
            applicationContext.dataLocale
          )
        );
        return pimIndexerStates.INDEXED;
      } catch (error) {
        // eslint-disable-next-line no-console
        if (process.env.NODE_ENV !== 'production') console.error(error);
        // project is not using pim-indexer when response error code is 404,
        // but we treat all errors as non-indexed as a safe guard, so we're
        // not checking the response error code at all
        return pimIndexerStates.NOT_INDEXED;
      }
    }
    return pimIndexerStates.NOT_INDEXED;
  }, [
    applicationContext.dataLocale,
    applicationContext.project,
    dispatchFetchPimIndexerStatus,
  ]);

  const getProjectIndexStatus = useCallback(async () => {
    // skip when there is no project
    if (!applicationContext.project) return pimIndexerStates.NOT_INDEXED;

    const canViewProducts = hasSomePermissions(
      [permissions.ViewProducts],
      applicationContext.permissions
    );

    // skip checking when user can't view products anyways
    if (!canViewProducts) return pimIndexerStates.NOT_INDEXED;

    return await fetchPimIndexerStatus();
  }, [
    applicationContext.permissions,
    applicationContext.project,
    fetchPimIndexerStatus,
  ]);

  useEffect(() => {
    if (props.pimIndexerState === pimIndexerStates.UNCHECKED) {
      getProjectIndexStatus().then((status) => {
        onPimIndexerStateChangeFromParent(status);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- run only once, when component mounts

  const execQuery = useCallback<ExecGraphQlQuery>(
    (Query, variables, context) =>
      apolloClient
        .query({
          query: Query,
          errorPolicy: 'ignore',
          variables,
          context,
        })
        .then((response) => response.data),
    [apolloClient]
  );

  const getNextCommands = useCallback<(command: Command) => Promise<Command[]>>(
    async (command) => {
      if (!command.subCommands) return [];
      if (Array.isArray(command.subCommands)) return command.subCommands;
      return await command.subCommands(execQuery);
    },
    [execQuery]
  );

  const getProjectCommands = useCallback<
    (searchText: string) => Promise<Command[]>
  >(
    async (searchText) => {
      const idsOfProductsMatchingSearchText =
        props.pimIndexerState === pimIndexerStates.INDEXED
          ? await fetchPimSearchProductIds(searchText)
          : [];

      const canViewProducts = hasSomePermissions(
        [permissions.ViewProducts],
        applicationContext.permissions
      );
      const data = await execQuery<TQuickAccessQuery>(
        QuickAccessQuery,
        {
          searchText: sanitize(searchText),
          // Pass conditional arguments to disable some of the queries
          canViewProducts,
          productsWhereClause: `id in (${idsOfProductsMatchingSearchText
            .map((id) => JSON.stringify(id))
            .join(', ')})`,
          includeProductsByIds: Boolean(
            canViewProducts && idsOfProductsMatchingSearchText.length > 0
          ),
        },
        {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        }
      );

      const commands = [];

      if (
        data &&
        data.productByVariantKey &&
        data.productByVariantKey.masterData &&
        data.productByVariantKey.masterData.staged &&
        data.productByVariantKey.masterData.staged.variant &&
        applicationContext.project &&
        applicationContext.dataLocale
      ) {
        const productId = data.productByVariantKey.id;
        const variantId = data.productByVariantKey.masterData.staged.variant.id;
        const variantKey =
          data.productByVariantKey.masterData.staged.variant.key;
        commands.push({
          id: `go/product-variant-by-key/product(${productId}/variant(${variantId})`,
          text: intl.formatMessage(messages.showProductVariant, {
            variantName: translate(
              data.productByVariantKey.masterData.staged.nameAllLocales,
              applicationContext.dataLocale
            ),
          }),
          keywords: variantKey ? [variantKey] : undefined,
          action: {
            type: actionTypes.go,
            to: oneLineTrim`
            /${applicationContext.project.key}
            /products
            /${productId}
            /variants
            /${variantId}
          `,
          },
          subCommands: createProductVariantSubCommands({
            intl,
            applicationContext,
            productId,
            variantId,
          }),
        });
      }
      if (
        data &&
        data.productByVariantSku &&
        data.productByVariantSku.masterData &&
        data.productByVariantSku.masterData.staged &&
        data.productByVariantSku.masterData.staged.variant &&
        applicationContext.project &&
        applicationContext.dataLocale
      ) {
        const productId = data.productByVariantSku.id;
        const variantId = data.productByVariantSku.masterData.staged.variant.id;
        commands.push({
          id: `go/product-variant-by-sku/product(${productId})/variant(${variantId})`,
          text: intl.formatMessage(messages.showProductVariant, {
            variantName: data.productByVariantSku.masterData.staged.variant.sku,
          }),
          action: {
            type: actionTypes.go,
            to: oneLineTrim`
            /${applicationContext.project.key}
            /products
            /${productId}
            /variants
            /${variantId}
          `,
          },
          subCommands: createProductVariantSubCommands({
            intl,
            applicationContext,
            productId,
            variantId,
          }),
        });
      }
      if (
        data &&
        data.productById &&
        data.productById.masterData &&
        data.productById.masterData.staged &&
        data.productById.masterData.staged.nameAllLocales &&
        applicationContext.project &&
        applicationContext.dataLocale
      ) {
        const productId = data.productById.id;
        commands.push({
          id: `go/product-by-id/product(${productId})`,
          text: intl.formatMessage(messages.showProduct, {
            productName: translate(
              data.productById.masterData.staged.nameAllLocales,
              applicationContext.dataLocale
            ),
          }),
          keywords: [productId],
          action: {
            type: actionTypes.go,
            to: `/${applicationContext.project.key}/products/${productId}`,
          },
          subCommands: createProductTabsSubCommands({
            intl,
            applicationContext,
            productId,
          }),
        });
      }
      if (data && data.productsByIds && data.productsByIds.results) {
        data.productsByIds.results.forEach((product) => {
          if (
            product.masterData.staged &&
            applicationContext.project &&
            applicationContext.dataLocale
          ) {
            commands.push({
              id: `go/product-by-search-text/product(${product.id})`,
              text: intl.formatMessage(messages.showProduct, {
                productName: translate(
                  product.masterData.staged.nameAllLocales,
                  applicationContext.dataLocale
                ),
              }),
              keywords: [product.id],
              action: {
                type: actionTypes.go,
                to: `/${applicationContext.project.key}/products/${product.id}`,
              },
              subCommands: createProductTabsSubCommands({
                intl,
                applicationContext,
                productId: product.id,
              }),
            });
          }
        });
      }
      if (
        data &&
        data.productByKey &&
        applicationContext.project &&
        applicationContext.dataLocale
      ) {
        const productId = data.productByKey.id;
        commands.push({
          id: `go/product-by-key/product(${productId})`,
          text: intl.formatMessage(messages.showProduct, {
            productName: searchText,
          }),
          action: {
            type: actionTypes.go,
            to: `/${applicationContext.project.key}/products/${productId}`,
          },
          subCommands: createProductTabsSubCommands({
            intl,
            applicationContext,
            productId,
          }),
        });
      }

      return commands;
    },
    [
      applicationContext,
      execQuery,
      fetchPimSearchProductIds,
      intl,
      props.pimIndexerState,
    ]
  );
  const debouncedGetProjectCommands = debounce(getProjectCommands, 200, {
    cancelObj: 'canceled',
  });

  const search = useCallback<(searchText: string) => Promise<Command[]>>(
    async (searchText) => {
      const generalCommands = createCommands({
        applicationContext,
        changeProjectDataLocale: props.onChangeProjectDataLocale,
        intl,
        featureToggles: {
          pimSearch: isPimSearchEnabled,
          customApplications: isCustomApplicationsEnabled,
          canViewDashboard: isCanViewDashboardEnabled,
        },
      });

      if (!applicationContext.project) return generalCommands;

      // Avoid searching for short texts, as we won't get any good results
      // anyways. This results in commands popping up immediately when the user
      // starts typing, which gives the whole search a much more repsonsive
      // feeling.
      if (searchText.trim().length < 3) return generalCommands;

      try {
        const projectCommands = await debouncedGetProjectCommands(searchText);
        const allCommands = [...generalCommands, ...projectCommands];
        return await flattenCommands(allCommands, execQuery);
      } catch (error) {
        // When the debounced search is canceled, it throws with "canceled"
        // In that case we know that another search is going to happen
        // and we just resolve with the general commands.
        if (error === 'canceled') return generalCommands;
        throw error;
      }
    },
    [
      applicationContext,
      debouncedGetProjectCommands,
      execQuery,
      intl,
      isCanViewDashboardEnabled,
      isCustomApplicationsEnabled,
      isPimSearchEnabled,
      props.onChangeProjectDataLocale,
    ]
  );

  const executeCommand = useCallback<
    (command: Command, meta: { openInNewTab: boolean }) => void
  >(
    (command, meta) => {
      if (typeof command.action === 'function') {
        // Idea: We could handle these errors and set them on status bar of Butler
        // We can also handle sync/async commands by checking command.action.then
        command.action();
        return;
      }
      // open in new window
      // and always open other pages in a new window
      if (meta.openInNewTab || !command.action.to.startsWith('/')) {
        // eslint-disable-next-line no-restricted-globals
        open(command.action.to, '_blank');
      } else if (applicationContext.environment.useFullRedirectsForLinks) {
        location.replace(command.action.to);
      } else {
        history.push(command.action.to);
      }
    },
    [applicationContext.environment.useFullRedirectsForLinks, history]
  );

  return (
    <Butler
      historyEntries={historyEntries}
      onHistoryEntriesChange={handleHistoryEntriesChange}
      search={search}
      executeCommand={executeCommand}
      onClose={props.onClose}
      getNextCommands={getNextCommands}
    />
  );
};
QuickAccess.displayName = 'QuickAccess';

export default QuickAccess;
