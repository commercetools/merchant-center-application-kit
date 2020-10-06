import type { DocumentNode } from 'graphql';
import type {
  OperationVariables,
  QueryResult,
  QueryHookOptions,
  QueryTuple,
  MutationTuple,
  MutationHookOptions,
} from '@apollo/client';
import type { TApolloContext } from '../../utils/apollo-context';

import { useQuery, useLazyQuery, useMutation } from '@apollo/client/react';

type TQueryOptionsWithContext<
  TData = unknown,
  TVariables = OperationVariables
> = QueryHookOptions<TData, TVariables> & {
  context: TApolloContext;
};
type TMutationOptionsWithContext<
  TData = unknown,
  TVariables = OperationVariables
> = MutationHookOptions<TData, TVariables> & {
  context: TApolloContext;
};

function useMcQuery<TData = unknown, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: TQueryOptionsWithContext<TData, TVariables>
): QueryResult<TData, TVariables> {
  return useQuery<TData, TVariables>(query, options);
}

function useMcLazyQuery<TData = unknown, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: TQueryOptionsWithContext<TData, TVariables>
): QueryTuple<TData, TVariables> {
  return useLazyQuery<TData, TVariables>(query, options);
}

function useMcMutation<TData = unknown, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: TMutationOptionsWithContext<TData, TVariables>
): MutationTuple<TData, TVariables> {
  return useMutation<TData, TVariables>(mutation, options);
}

// Custom Apollo query/mutation wrappers, useful to take advantage
// of the `context` shape specific to MC queries.
export { useMcQuery, useMcLazyQuery, useMcMutation };
