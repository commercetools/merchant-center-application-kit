import type { ApolloError } from '@apollo/client/errors';
import type {
  TFetchLoggedInUserQuery,
  TFetchLoggedInUserQueryVariables,
} from '../../types/generated/mc';

import React from 'react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { useMcQuery } from '../../hooks/apollo-hooks';
import LoggedInUserQuery from './fetch-user.mc.graphql';

type RenderFnArgs = {
  isLoading: boolean;
  error?: ApolloError;
  user: TFetchLoggedInUserQuery['user'];
};
type Props = {
  children: (args: RenderFnArgs) => React.ReactNode;
};

const FetchUser = (props: Props) => {
  const { loading, data, error } = useMcQuery<
    TFetchLoggedInUserQuery,
    TFetchLoggedInUserQueryVariables
  >(LoggedInUserQuery, {
    onError: reportErrorToSentry,
    context: { target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND },
  });
  return (
    <>
      {props.children({ isLoading: loading, user: data && data.user, error })}
    </>
  );
};
FetchUser.displayName = 'FetchUser';

export default FetchUser;
