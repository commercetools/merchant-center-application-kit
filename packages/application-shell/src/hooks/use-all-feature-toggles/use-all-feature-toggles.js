import { useQuery } from 'react-apollo';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FetchAllFeatureToggles } from './fetch-all-feature-toggles.proxy.graphql';

const useAllFeatureToggles = () => {
  const mcProxyApiUrl = useApplicationContext(
    context => context.environment.mcProxyApiUrl
  );

  const { data, refetch, loading } = useQuery(FetchAllFeatureToggles, {
    fetchPolicy: 'cache-and-network',
    context: {
      uri: `${mcProxyApiUrl || defaultApiUrl}/api/graphql`,
    },
  });

  return {
    isLoading: loading,
    refetch,
    allFeatureToggles: (data && data.allFeatureToggles) || [],
  };
};

export default useAllFeatureToggles;
