import type {
  TFetchAllMenuFeatureTogglesQuery,
  TFetchAllMenuFeatureTogglesQueryVariables,
} from '../../types/generated/proxy';

import { useQuery } from '@apollo/client/react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
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
  const servedByProxy = useApplicationContext(
    (applicationContext) => applicationContext.environment.servedByProxy
  );
  const mcProxyApiUrl = useApplicationContext(
    (applicationContext) => applicationContext.environment.mcProxyApiUrl
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
      skipGraphQlTargetCheck: true,
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
