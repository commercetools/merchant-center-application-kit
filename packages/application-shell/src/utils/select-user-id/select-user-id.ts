import type { TFetchUserIdQuery } from '../../types/generated/mc';
import { getCachedApolloClient } from '../apollo-client-runtime-cache';
import { FetchUserId } from './select-user-id.mc.graphql';

export default function selectUserId(): string | null {
  const apolloClient = getCachedApolloClient();
  if (!apolloClient) {
    return null;
  }
  try {
    const queryResult = apolloClient.readQuery<TFetchUserIdQuery>({
      query: FetchUserId,
    });

    if (queryResult && queryResult.user) {
      return queryResult.user.id;
    }
  } catch (e) {
    return null;
  }

  return null;
}
