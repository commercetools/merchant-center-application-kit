import { useQuery } from 'react-apollo';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FetchAllMenuFeatureToggles } from './fetch-all-menu-feature-toggles.proxy.graphql';

const useAllMenuFeatureToggles = () => {
  const mcProxyApiUrl = useApplicationContext(
    context => context.environment.mcProxyApiUrl
  );

  const { data, refetch, loading } = useQuery(FetchAllMenuFeatureToggles, {
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

export default useAllMenuFeatureToggles;
