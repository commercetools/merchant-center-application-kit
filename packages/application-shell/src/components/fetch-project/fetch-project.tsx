import React from 'react';
import { ApolloError } from 'apollo-client';
import { useQuery } from 'react-apollo';
import {
  GRAPHQL_TARGETS,
  TGraphQLTargets,
} from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  TFetchProjectQuery,
  TFetchProjectQueryVariables,
} from '../../types/generated/mc';
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
  const { loading, data, error } = useQuery<
    TFetchProjectQuery,
    TFetchProjectQueryVariables & { target: TGraphQLTargets }
  >(ProjectQuery, {
    onError: reportErrorToSentry,
    variables: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      projectKey: props.projectKey,
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
