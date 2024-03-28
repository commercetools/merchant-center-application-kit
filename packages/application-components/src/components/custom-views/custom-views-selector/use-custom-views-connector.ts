import { useFlagVariation } from '@flopflip/react-broadcast';
import { useMcQuery } from '@commercetools-frontend/application-shell-connectors';
import {
  CustomViewData,
  GRAPHQL_TARGETS,
  featureFlags,
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
  const enableCustomViews = useFlagVariation(featureFlags.CUSTOM_VIEWS);
  const areCustomViewsEnabled =
    // @ts-ignore In case it's coming from the MC API, it's an object { value: boolean }.
    (enableCustomViews?.value ?? enableCustomViews) &&
    process.env.DISABLE_CUSTOM_VIEWS_FEATURE !== 'true';

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
    skip: !areCustomViewsEnabled,
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
