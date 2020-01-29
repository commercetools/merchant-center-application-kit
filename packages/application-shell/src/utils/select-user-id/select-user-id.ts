import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { TFetchUserIdQuery } from '../../types/generated/mc';
import FetchUserIdQuery from './select-user-id.mc.graphql';

export default function selectUserId({
  apolloCache,
}: {
  apolloCache: ApolloClient<NormalizedCacheObject>;
}) {
  try {
    const queryResult = apolloCache.readQuery<TFetchUserIdQuery>({
      query: FetchUserIdQuery,
    });

    if (queryResult && queryResult.user) {
      return queryResult.user.id;
    }
  } catch (e) {
    return null;
  }

  return null;
}
