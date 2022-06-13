import { useQuery } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type {
  TChannelQueryResult,
  TFetchChannelsQueryVariables,
} from '../../../types/generated/ctp';

export const useChannelsFetcher = () => {
  const { data, error, loading } = useQuery<
    { channels: TChannelQueryResult },
    TFetchChannelsQueryVariables
  >(FetchChannelsQuery, {
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
