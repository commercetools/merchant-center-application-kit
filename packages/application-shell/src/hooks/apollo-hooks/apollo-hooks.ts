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
  TVariables extends OperationVariables = OperationVariables
> = QueryHookOptions<TData, TVariables> & {
  context: TApolloContext;
};
type TMutationOptionsWithContext<
  TData = unknown,
  TVariables = OperationVariables
> = MutationHookOptions<TData, TVariables, TApolloContext> & {
  context: TApolloContext;
};

function useMcQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode,
  options?: TQueryOptionsWithContext<TData, TVariables>
): QueryResult<TData, TVariables> {
  return useQuery<TData, TVariables>(query, options);
}

function useMcLazyQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode,
  options?: TQueryOptionsWithContext<TData, TVariables>
): QueryTuple<TData, TVariables> {
  return useLazyQuery<TData, TVariables>(query, options);
}

function useMcMutation<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  mutation: DocumentNode,
  options?: TMutationOptionsWithContext<TData, TVariables>
): MutationTuple<TData, TVariables, TApolloContext> {
  return useMutation<TData, TVariables, TApolloContext>(mutation, options);
}

// Custom Apollo query/mutation wrappers, useful to take advantage
// of the `context` shape specific to MC queries.
export { useMcQuery, useMcLazyQuery, useMcMutation };
