import { useMcQuery } from '@commercetools-frontend/application-shell-connectors';
import {
  CustomViewData,
  GRAPHQL_TARGETS,
} from '@commercetools-frontend/constants';
import {
  TFetchCustomViewsByLocatorQuery,
  TFetchCustomViewsByLocatorQueryVariables,
} from '../../../types/generated/settings';
import FetchCustomViewsQuery from './fetch-custom-views-by-locator.settings.graphql';

type TUseCustomViewsFetcherParams = {
  customViewLocatorCode: string;
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
      customViewLocatorCode,
    },
    context: {
      target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
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
