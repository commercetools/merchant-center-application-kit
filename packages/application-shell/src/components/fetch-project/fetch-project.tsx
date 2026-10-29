import { ReactNode, useEffect } from 'react';
import type { ApolloError } from '@apollo/client/errors';
import { useMcQuery } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import usePrefetchedQuery from '../../hooks/use-prefetched-query';
import type {
  TFetchProjectQuery,
  TFetchProjectQueryVariables,
} from '../../types/generated/mc';
import { markOnce, PERFORMANCE_MARKS } from '../../utils';
import { PREFETCH_PATHS } from '../../utils/prefetched-query';
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
  // Use the data prefetched by the proxy, if any. The query then reads it
  // from the cache.
  const { isPending: isPrefetchPending } = usePrefetchedQuery({
    path: PREFETCH_PATHS.project,
    params: { projectKey: props.projectKey },
    query: ProjectQuery,
    variables: { projectKey: props.projectKey },
    skip: props.skip === true || !props.projectKey,
  });
  const {
    loading: isQueryLoading,
    data,
    error,
  } = useMcQuery<TFetchProjectQuery, TFetchProjectQueryVariables>(
    ProjectQuery,
    {
      variables: {
        projectKey: props.projectKey,
      },
      context: {
        target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
        enableSentryErrorReporting: true,
      },
      skip: props.skip === true || isPrefetchPending,
    }
  );
  const loading = isPrefetchPending || isQueryLoading;

  useEffect(() => {
    if (!loading && data?.project) {
      markOnce(PERFORMANCE_MARKS.HYDRATION_PROJECT);
    }
  }, [loading, data?.project]);

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
