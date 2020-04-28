import type { NormalizedCacheObject } from 'apollo-cache-inmemory';
import type { TFetchUserIdQuery } from '../../types/generated/mc';

import ApolloClient from 'apollo-client';
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
