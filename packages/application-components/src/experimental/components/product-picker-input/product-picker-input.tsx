import type { GraphQLError } from 'graphql';

import React, { ChangeEvent } from 'react';
import { FocusEventHandler } from 'react-select';
import { ApolloError } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useIntl } from 'react-intl';
import debounce from 'debounce-async';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import { ErrorMessage } from '@commercetools-uikit/messages';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import { validate as isUUID } from 'uuid';
import {
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import {
  DropdownIndicator,
  CenteredLoadingSpinner,
  Option,
} from '../internals';
import useLoadWithPrefixSearchFields from '../../hooks/use-load-with-prefix-search-fields';
import FetchProductByPrefix from './fetch-product-by-prefix.ctp.graphql';
import PrefetchProduct from './prefetch-selected-product.ctp.graphql';
import { TProductQueryResult, TProduct } from '../../../types/generated/ctp';
import messages from './messages';

type TProps = {
  name: string;
  value: string;
  hasError?: boolean;
  isReadOnly?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;

  onChange: (event: ChangeEvent) => void;
  onInputChange?: (nextInputValue: string) => void;
  onBlur?: FocusEventHandler;
  onInitialLoadError?: (error: ApolloError) => void;
  onLoadError?: (errors: GraphQLError[]) => void;
};

type TFlattenedProduct = {
  id: string;
  key?: string;
  name: Record<string, string> | null;
};

type TProductOption = {
  value: string;
  label: string;
  key?: string;
};

type TPrefixProductGraphqlProducts = {
  products: TProductQueryResult;
};

const debounceDelayInMs = 300;

const flattenProduct = (product: TProduct): TFlattenedProduct => {
  const transformedName = transformLocalizedFieldToLocalizedString(
    product.masterData.current?.nameAllLocales
  );
  return {
    id: product.id,
    key: product.key,
    name: transformedName,
  };
};

const ProductPickerInput = (props: TProps): JSX.Element => {
  const { onInitialLoadError, onInputChange, onLoadError } = props;
  const [loadingError, setLoadingError] = React.useState(false);
  const intl = useIntl();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project?.languages,
  }));

  const loadWithPrefixSearchFields = useLoadWithPrefixSearchFields<TPrefixProductGraphqlProducts>(
    {
      query: FetchProductByPrefix,
      prefixSearchFields: [`masterData.current.name.${dataLocale}`, 'key'],
    }
  );
  const loadResourceWithPrefix = React.useCallback<
    (options: {
      inputValue: string;
    }) => ReturnType<typeof loadWithPrefixSearchFields>
  >(
    (options) => {
      const debounced = debounce(loadWithPrefixSearchFields, debounceDelayInMs);
      return debounced(options);
    },
    [loadWithPrefixSearchFields]
  );

  const convertProductToOption = React.useCallback(
    (product: TFlattenedProduct): TProductOption => {
      const formattedName = formatLocalizedString(product, {
        key: 'name',
        locale: dataLocale,
        fallback: NO_VALUE_FALLBACK,
        fallbackOrder: projectLanguages,
      });
      return {
        key: product.key,
        label: formattedName,
        value: product.id,
      };
    },
    [projectLanguages, dataLocale]
  );

  const loadOptionsAsync = React.useCallback(
    (inputValue) => {
      return loadResourceWithPrefix({ inputValue })
        .then(
          ({ data }: { data?: TPrefixProductGraphqlProducts }) =>
            data?.products?.results
              ?.map(flattenProduct)
              .map(convertProductToOption) ?? []
        )
        .catch((graphQlErrors: GraphQLError[]) => {
          if (onLoadError) {
            setLoadingError(true);
            onLoadError(graphQlErrors);
          }
        });
    },
    [loadResourceWithPrefix, convertProductToOption, onLoadError]
  );

  const handleInputChange = React.useCallback(
    (inputValue) => {
      setLoadingError(false);
      if (onInputChange) {
        onInputChange(inputValue);
      }
    },
    [onInputChange, setLoadingError]
  );

  // GIVEN Merchant Center Product Details
  // WITH custom field "product"
  // AND custom field product has value "product-a"

  // WHEN "product-a" no longer exists
  // THEN set an error

  // WHEN "product-a" fails to load
  // THEN set an error
  const prefetchSelectedProductQuery = useQuery(PrefetchProduct, {
    variables: { id: props.value },
    context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
    skip: !props.value || !isUUID(props.value),
  });

  const { error: prefetchError } = prefetchSelectedProductQuery;
  React.useEffect(() => {
    if (prefetchError) {
      setLoadingError(true);
      if (onInitialLoadError) {
        onInitialLoadError(prefetchError);
      }
    }
    // NOTE: do not include variables from `props`, to avoid unwanted side effects
    // like infinite loops (for example if the reference changes on each render).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefetchError, setLoadingError]);

  const prefetchSelectedProduct = prefetchSelectedProductQuery.data?.product
    ? convertProductToOption(
        flattenProduct(prefetchSelectedProductQuery.data.product)
      )
    : null;

  return (
    <Constraints.Horizontal constraint="scale">
      {prefetchSelectedProductQuery.loading ? (
        <CenteredLoadingSpinner />
      ) : (
        <Spacings.Stack scale="xs">
          <AsyncSelectInput
            name={props.name}
            id={props.name}
            placeholder={intl.formatMessage(messages.placeholder)}
            loadOptions={loadOptionsAsync}
            defaultOptions={[]}
            components={{
              Option,
              DropdownIndicator,
            }}
            onInputChange={handleInputChange}
            value={prefetchSelectedProduct}
            noOptionsMessage={() =>
              intl.formatMessage(messages.noProductsFound)
            }
            isClearable={props.isClearable}
            isReadOnly={props.isReadOnly}
            isDisabled={props.isDisabled}
            onBlur={props.onBlur}
            onChange={props.onChange}
            hasError={props.hasError}
            loadingMessage={intl.formatMessage(messages.loadingMessage)}
          />
          {loadingError && (
            <ErrorMessage intlMessage={messages.onResourceLoadError} />
          )}
        </Spacings.Stack>
      )}
    </Constraints.Horizontal>
  );
};

export default ProductPickerInput;
