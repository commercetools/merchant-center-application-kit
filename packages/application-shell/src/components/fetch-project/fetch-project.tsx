import { ReactNode } from 'react';
import type { ApolloError } from '@apollo/client/errors';
import { useMcQuery } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
// import { useMcQuery } from '../../hooks/apollo-hooks';
import type {
  TFetchProjectQuery,
  TFetchProjectQueryVariables,
} from '../../types/generated/mc';
import ProjectQuery from './fetch-project.mc.graphql';

type RenderFnArgs = {
  isLoading: boolean;
  error?: ApolloError;
  project: TFetchProjectQuery['project'];
};
type TFetchProjectProps = {
  projectKey?: string;
  skip?: boolean;
  children: (args: RenderFnArgs) => ReactNode;
};

const FetchProject = (props: TFetchProjectProps) => {
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
