import { useQuery } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

export const useChannelsFetcher = () => {
  const { data, error, loading } = useQuery(FetchChannelsQuery, {
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    channels: data?.channels,
    error,
    loading,
  };
};
