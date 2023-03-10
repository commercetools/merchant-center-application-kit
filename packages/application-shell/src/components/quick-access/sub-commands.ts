import { oneLineTrim } from 'common-tags';
import type { IntlShape } from 'react-intl';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { hasSomePermissions } from '@commercetools-frontend/permissions';
import type {
  TProductVariant,
  TQuickAccessProductQuery,
} from '../../types/generated/ctp';
import { permissions } from './constants';
import messages from './messages';
import QuickAccessProductQuery from './quick-access-product.ctp.graphql';
import type { Command, ExecGraphQlQuery } from './types';
import { actionTypes } from './types';

type CreateProductVariantSubCommandsOptions = {
  intl: IntlShape;
  applicationContext: TApplicationContext<{}>;
  productId: string;
  variantId: number;
};
export const createProductVariantSubCommands = ({
  intl,
  applicationContext,
  productId,
  variantId,
}: CreateProductVariantSubCommandsOptions): Command[] => {
  const canViewProducts = hasSomePermissions(
    [permissions.ViewProducts],
    applicationContext.permissions
  );
  if (!canViewProducts || !applicationContext.project) return [];
  return [
    {
      id: `go/product(${productId})/variant(${variantId})/attributes`,
      text: intl.formatMessage(messages.showProductVariantAttributes),
      action: {
        type: actionTypes.go,
        to: oneLineTrim`
          /${applicationContext.project.key}
          /products
          /${productId}
          /variants
          /${variantId}
          /attributes
        `,
      },
    },
    {
      id: `go/product(${productId})/variant${variantId}/images`,
      text: intl.formatMessage(messages.showProductVariantImages),
      action: {
        type: actionTypes.go,
        to: oneLineTrim`
          /${applicationContext.project.key}
          /products
          /${productId}
          /variants
          /${variantId}
          /images
        `,
      },
    },
    {
      id: `go/product(${productId})/variant(${variantId})/prices`,
      text: intl.formatMessage(messages.showProductVariantPrices),
      action: {
        type: actionTypes.go,
        to: oneLineTrim`
          /${applicationContext.project.key}
          /products
          /${productId}
          /variants
          /${variantId}
          /prices
        `,
      },
    },
    {
      id: `go/product(${productId})/variant(${variantId})/inventory`,
      text: intl.formatMessage(messages.showProductVariantInventory),
      action: {
        type: actionTypes.go,
        to: oneLineTrim`
          /${applicationContext.project.key}
          /products
          /${productId}
          /variants
          /${variantId}
          /inventory
        `,
      },
    },
  ];
};

const formatVariantMessage = (
  variant: Pick<TProductVariant, 'id' | 'key' | 'sku'>,
  intl: IntlShape
) => {
  if (variant.sku)
    return intl.formatMessage(messages.openVariantBySku, {
      sku: variant.sku,
    });
  if (variant.key)
    return intl.formatMessage(messages.openVariantByKey, {
      key: variant.key,
    });
  return intl.formatMessage(messages.openVariantById, { id: variant.id });
};

type CreateProductVariantListSubCommandsOptions = {
  intl: IntlShape;
  applicationContext: TApplicationContext<{}>;
  productId: string;
  execQuery: ExecGraphQlQuery;
};
const createProductVariantListSubCommands = async ({
  intl,
  applicationContext,
  productId,
  execQuery,
}: CreateProductVariantListSubCommandsOptions): Promise<Command[]> => {
  const canViewProducts = hasSomePermissions(
    [permissions.ViewProducts],
    applicationContext.permissions
  );
  if (!canViewProducts) return [];
  const data = await execQuery<TQuickAccessProductQuery>(
    QuickAccessProductQuery,
    { productId },
    { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM }
  );
  if (
    data &&
    data.product &&
    data.product.masterData &&
    data.product.masterData.staged &&
    applicationContext.project
  ) {
    const projectKey = applicationContext.project.key;
    return data.product.masterData.staged.allVariants.map((variant) => ({
      id: `go/product(${productId})/variant(${variant.id})`,
      text: formatVariantMessage(variant, intl),
      subCommands: createProductVariantSubCommands({
        intl,
        applicationContext,
        productId,
        variantId: variant.id,
      }),
      action: {
        type: actionTypes.go,
        to: oneLineTrim`
          /${projectKey}
          /products
          /${productId}
          /variants
          /${variant.id}
        `,
      },
    }));
  }
  return [];
};

type CreateProductTabsSubCommandsOptions = {
  intl: IntlShape;
  applicationContext: TApplicationContext<{}>;
  productId: string;
};
export const createProductTabsSubCommands = ({
  intl,
  applicationContext,
  productId,
}: CreateProductTabsSubCommandsOptions): Command[] => {
  const canViewProducts = hasSomePermissions(
    [permissions.ViewProducts],
    applicationContext.permissions
  );
  if (!canViewProducts || !applicationContext.project) return [];
  return [
    {
      id: `go/product(${productId})/general`,
      text: intl.formatMessage(messages.openProductVariantGeneral),
      action: {
        type: actionTypes.go,
        to: oneLineTrim`
          /${applicationContext.project.key}
          /products
          /${productId}
          /general
        `,
      },
    },
    {
      id: `go/product(${productId})/variants`,
      text: intl.formatMessage(messages.openProductVariantList),
      action: {
        type: actionTypes.go,
        to: oneLineTrim`
          /${applicationContext.project.key}
          /products
          /${productId}
          /variants
        `,
      },
      subCommands: (execQuery) =>
        createProductVariantListSubCommands({
          intl,
          applicationContext,
          productId,
          execQuery,
        }),
    },
    {
      id: `go/product(${productId})/search`,
      text: intl.formatMessage(messages.openProductVariantSearch),
      action: {
        type: actionTypes.go,
        to: oneLineTrim`
          /${applicationContext.project.key}
          /products
          /${productId}
          /search
        `,
      },
    },
  ];
};
