import { ReactNode, useEffect } from 'react';
import type { ApolloError } from '@apollo/client/errors';
import { useMcQuery } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type {
  TFetchLoggedInUserQuery,
  TFetchLoggedInUserQueryVariables,
} from '../../types/generated/mc';
import { markOnce, PERFORMANCE_MARKS } from '../../utils';
import LoggedInUserQuery from './fetch-user.mc.graphql';

type RenderFnArgs = {
  isLoading: boolean;
  error?: ApolloError;
  user: TFetchLoggedInUserQuery['user'];
};
type TFetchUserProps = {
  children: (args: RenderFnArgs) => ReactNode;
};

const FetchUser = (props: TFetchUserProps) => {
  const { loading, data, error } = useMcQuery<
    TFetchLoggedInUserQuery,
    TFetchLoggedInUserQueryVariables
  >(LoggedInUserQuery, {
    context: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      enableSentryErrorReporting: true,
    },
  });

  useEffect(() => {
    if (!loading && data?.user) {
      markOnce(PERFORMANCE_MARKS.HYDRATION_USER);
    }
  }, [loading, data?.user]);

  return (
    <>
      {props.children({ isLoading: loading, user: data && data.user, error })}
    </>
  );
};
FetchUser.displayName = 'FetchUser';

export default FetchUser;
