import UserIdQuery from './select-user-id.graphql';

export default cache => {
  try {
    const queryResult = cache.readQuery({
      query: UserIdQuery,
    });

    if (queryResult && queryResult.user) {
      return queryResult.user.id;
    }
  } catch (e) {
    return null;
  }

  return null;
};
