import type { ApolloError } from '@apollo/client/errors';
import type {
  TFetchProjectQuery,
  TFetchProjectQueryVariables,
} from '../../types/generated/mc';

import React from 'react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { useMcQuery } from '../../hooks/apollo-hooks';
import ProjectQuery from './fetch-project.mc.graphql';

type RenderFnArgs = {
  isLoading: boolean;
  error?: ApolloError;
  project: TFetchProjectQuery['project'];
};
type Props = {
  projectKey: string;
  skip?: boolean;
  children: (args: RenderFnArgs) => React.ReactNode;
};

const FetchProject = (props: Props) => {
  const { loading, data, error } = useMcQuery<
    TFetchProjectQuery,
    TFetchProjectQueryVariables
  >(ProjectQuery, {
    onError: reportErrorToSentry,
    variables: {
      projectKey: props.projectKey,
    },
    context: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
    },
    skip: props.skip === true,
  });
  return (
    <>
      {props.children({
        isLoading: loading,
        error,
        project: data && data.project,
      })}
    </>
  );
};
FetchProject.displayName = 'FetchProject';

export default FetchProject;
