import UserIdQuery from './select-user-id.graphql';

export default function selectUserId({ apolloCache }) {
  try {
    const queryResult = apolloCache.readQuery({
      query: UserIdQuery,
    });

    if (queryResult && queryResult.user) {
      return queryResult.user.id;
    }
  } catch (e) {
    return null;
  }

  return null;
}
