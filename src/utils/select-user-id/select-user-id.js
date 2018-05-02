import apolloClient from '../../configure-apollo';
import UserIdQuery from './select-user-id.graphql';

const selectUserId = () => {
  try {
    const queryResult = apolloClient.readQuery({
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

export default selectUserId;
