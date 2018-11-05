import { oneLineTrim } from 'common-tags';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import QuickAccessProductQuery from './quick-access-product.graphql';
import messages from './messages';

export const createProductVariantSubCommands = ({
  intl,
  project,
  productId,
  variantId,
}) => [
  {
    id: `go/product(${productId})/variant(${variantId})/attributes`,
    text: intl.formatMessage(messages.showProductVariantAttributes),
    action: {
      type: 'go',
      to: oneLineTrim`
        /${project.key}
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
      type: 'go',
      to: oneLineTrim`
        /${project.key}
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
      type: 'go',
      to: oneLineTrim`
        /${project.key}
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
      type: 'go',
      to: oneLineTrim`
        /${project.key}
        /products
        /${productId}
        /variants
        /${variantId}
        /inventory
      `,
    },
  },
];

export const createProductVariantListSubCommands = ({
  project,
  intl,
  query,
  productId,
}) =>
  query(QuickAccessProductQuery, {
    productId,
    target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
  }).then(data =>
    data.product.masterData.staged.allVariants.map(variant => ({
      id: `go/product(${productId})/variant(${variant.id})`,
      text: do {
        if (variant.sku)
          intl.formatMessage(messages.openVariantBySku, {
            sku: variant.sku,
          });
        if (variant.key)
          intl.formatMessage(messages.openVariantByKey, {
            key: variant.key,
          });
        intl.formatMessage(messages.openVariantById, { id: variant.id });
      },
      subCommands: createProductVariantSubCommands({
        intl,
        project,
        productId,
        variantId: variant.id,
      }),
      action: {
        type: 'go',
        to: `/${project.key}/products/${productId}/variants/${variant.id}`,
      },
    }))
  );

export const createProductTabsSubCommands = ({ intl, project, productId }) => [
  {
    id: `go/product(${productId})/general`,
    text: intl.formatMessage(messages.openProductVariantGeneral),
    action: {
      type: 'go',
      to: `/${project.key}/products/${productId}/general`,
    },
  },
  {
    id: `go/product(${productId})/variants`,
    text: intl.formatMessage(messages.openProductVariantList),
    subCommands: query =>
      createProductVariantListSubCommands({
        project,
        intl,
        query,
        productId,
      }),
    action: {
      type: 'go',
      to: `/${project.key}/products/${productId}/variants`,
    },
  },
  {
    id: `go/product(${productId})/search`,
    text: intl.formatMessage(messages.openProductVariantSearch),
    action: {
      type: 'go',
      to: `/${project.key}/products/${productId}/search`,
    },
  },
];
