import apolloClient from '../../configure-apollo';
import UserIdQuery from './select-user-id.graphql';

export default () => {
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
