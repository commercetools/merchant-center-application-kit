import { useQuery } from 'react-apollo';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  TFetchAllMenuFeatureTogglesQuery,
  TFetchAllMenuFeatureTogglesQueryVariables,
} from '../../types/generated/proxy';
import { FetchAllMenuFeatureToggles } from './fetch-all-menu-feature-toggles.proxy.graphql';

const defaultApiUrl = window.location.origin;

const getDefaultedFeatureToggles = (allFeatureToggles: string[]) =>
  allFeatureToggles.reduce<{ [key: string]: boolean }>(
    (previouslyDefaultedFeatureToggles, nextFeatureToggle) => ({
      ...previouslyDefaultedFeatureToggles,
      [nextFeatureToggle]: false,
    }),
    {}
  );
const useAllMenuFeatureToggles = () => {
  const servedByProxy = useApplicationContext<boolean>(
    applicationContext => applicationContext.environment.servedByProxy
  );
  const mcProxyApiUrl = useApplicationContext<string | undefined>(
    applicationContext => applicationContext.environment.mcProxyApiUrl
  );

  const { data, refetch, loading } = useQuery<
    TFetchAllMenuFeatureTogglesQuery,
    TFetchAllMenuFeatureTogglesQueryVariables
  >(FetchAllMenuFeatureToggles, {
    fetchPolicy: 'cache-and-network',
    skip: !servedByProxy,
    onError: reportErrorToSentry,
    context: {
      uri: `${mcProxyApiUrl || defaultApiUrl}/api/graphql`,
    },
  });

  return {
    isLoading: loading,
    refetch,
    allFeatureToggles:
      (data && getDefaultedFeatureToggles(data.allFeatureToggles)) || {},
  };
};

export default useAllMenuFeatureToggles;
