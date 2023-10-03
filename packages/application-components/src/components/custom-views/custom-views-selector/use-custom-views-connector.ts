import type {
  TFetchCustomViewsByLocatorQuery,
  TFetchCustomViewsByLocatorQueryVariables,
} from '@commercetools-frontend/application-shell/src/types/generated/settings';
import { useMcQuery } from '@commercetools-frontend/application-shell-connectors';
import {
  CustomViewData,
  GRAPHQL_TARGETS,
} from '@commercetools-frontend/constants';
import FetchCustomViewsQuery from './fetch-custom-views-by-locator.settings.graphql';

type TUseCustomViewsFetcherParams = {
  customViewLocatorCode?: string;
};
type TUseCustomViewsFetcher = (props: TUseCustomViewsFetcherParams) => {
  customViews: CustomViewData[];
  error?: Error;
  loading: boolean;
};

export const useCustomViewsConnector: TUseCustomViewsFetcher = ({
  customViewLocatorCode,
}) => {
  const { data, error, loading } = useMcQuery<
    TFetchCustomViewsByLocatorQuery,
    TFetchCustomViewsByLocatorQueryVariables
  >(FetchCustomViewsQuery, {
    variables: {
      customViewLocatorCode: customViewLocatorCode || '',
    },
    context: {
      target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
    skip: !customViewLocatorCode,
  });

  return {
    customViews:
      data?.allCustomViewsInstallationsByLocator?.map(
        (installation) => installation.customView as CustomViewData
      ) || [],
    error,
    loading,
  };
};
