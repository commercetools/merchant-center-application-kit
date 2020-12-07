import React, { ChangeEvent } from 'react';
import { FocusEventHandler } from 'react-select';
import { useQuery } from '@apollo/client/react';
import type { GraphQLError } from 'graphql';
import { ApolloError } from '@apollo/client';
import { useIntl } from 'react-intl';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import { ErrorMessage } from '@commercetools-uikit/messages';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import {
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import messages from './messages';
import { DropdownIndicator, CenteredLoadingSpinner, Option } from '../shared';
import useLoadWithPrefixSearchFields from '../../hooks/use-load-with-prefix-search-fields';
import useDebouncedPromiseCallback from '../../hooks/use-debounced-promise-callback';
import FetchProductByPrefix from './fetch-product-by-prefix.ctp.graphql';
import PrefetchProduct from './prefetch-selected-product.ctp.graphql';

type TProps = {
  name: string;
  value: string;
  hasError?: boolean;
  isReadOnly?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;

  onInputChange?: (nextInputValue: string) => void;
  onChange: (event: ChangeEvent) => void;
  onBlur?: FocusEventHandler;
  onInitialLoadError?: (error: ApolloError) => void;
  onLoadError?: (errors: GraphQLError[]) => void;
};

type TFlatProduct = {
  id: string;
  key: string;
  name: Record<string, string> | null;
};

type TProductMasterData = {
  current: Record<'nameAllLocales', TLocalizedField[]>;
};

type TFetchedProductWithMasterData = {
  id: string;
  key: string;
  masterData: TProductMasterData;
};

type TProductOption = {
  value: string;
  label: string;
  key: string;
};

type TLocalizedField = {
  locale: string;
  value: string;
};

type TPrefixProductGraphqlResults = {
  results: TFetchedProductWithMasterData[];
};

type TPrefixProductGraphqlProducts = {
  products: TPrefixProductGraphqlResults;
};

const TIME_TO_WAIT = 300;

const flattenProduct = (
  product: TFetchedProductWithMasterData
): TFlatProduct => {
  const transformedName = transformLocalizedFieldToLocalizedString(
    product.masterData.current.nameAllLocales
  );
  return {
    id: product.id,
    key: product.key,
    name: transformedName,
  };
};

const ProductPickerInput = (props: TProps): JSX.Element => {
  const {
    hasError,
    isClearable,
    isDisabled,
    isReadOnly,
    name,
    onBlur,
    onChange,
    onInitialLoadError,
    onInputChange,
    onLoadError,
  } = props;
  const [loadingError, setLoadingError] = React.useState(false);
  const { formatMessage } = useIntl();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project?.languages,
  }));
  const prefixSearchFields = React.useMemo(
    () => [`masterData.current.name.${dataLocale}`, 'key'],
    [dataLocale]
  );

  const loadResourceWithPrefix = useDebouncedPromiseCallback(
    useLoadWithPrefixSearchFields<TPrefixProductGraphqlProducts>({
      query: FetchProductByPrefix,
      prefixSearchFields,
    }),
    TIME_TO_WAIT
  );

  const convertProductToOption = React.useCallback(
    (product: TFlatProduct): TProductOption => {
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

  const loadOptions = React.useCallback(
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
    skip: !props.value,
  });

  const { error: prefetchError } = prefetchSelectedProductQuery;
  React.useEffect(() => {
    setLoadingError(true);
    if (prefetchError && onInitialLoadError) {
      onInitialLoadError(prefetchError);
    }
  }, [prefetchError, onInitialLoadError, setLoadingError]);

  const prefetchSelectedProduct = prefetchSelectedProductQuery.data?.product
    ? convertProductToOption(
        flattenProduct(prefetchSelectedProductQuery.data.product)
      )
    : props.value;

  return (
    <Constraints.Horizontal constraint="scale">
      {prefetchSelectedProductQuery.loading ? (
        <CenteredLoadingSpinner />
      ) : (
        <Spacings.Stack scale="xs">
          <AsyncSelectInput
            name={name}
            id={name}
            placeholder={formatMessage(messages.placeholder)}
            loadOptions={loadOptions}
            defaultOptions={[]}
            isClearable={isClearable}
            isReadOnly={isReadOnly}
            isDisabled={isDisabled}
            components={{
              Option,
              DropdownIndicator,
            }}
            onChange={onChange}
            onInputChange={handleInputChange}
            onBlur={onBlur}
            value={prefetchSelectedProduct}
            noOptionsMessage={() => formatMessage(messages.noProductsFound)}
            hasError={hasError}
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
