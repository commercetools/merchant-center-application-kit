import type {
  OperationVariables,
  QueryResult,
  QueryHookOptions,
  QueryTuple,
  MutationTuple,
  MutationHookOptions,
  TypedDocumentNode,
  DocumentNode,
} from '@apollo/client';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client/react';
import type { TApolloContext } from '../../utils/apollo-context';

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
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: TQueryOptionsWithContext<TData, TVariables>
): QueryResult<TData, TVariables> {
  return useQuery<TData, TVariables>(query, options);
}

function useMcLazyQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: TQueryOptionsWithContext<TData, TVariables>
): QueryTuple<TData, TVariables> {
  return useLazyQuery<TData, TVariables>(query, options);
}

function useMcMutation<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: TMutationOptionsWithContext<TData, TVariables>
): MutationTuple<TData, TVariables, TApolloContext> {
  return useMutation<TData, TVariables, TApolloContext>(mutation, options);
}

// Custom Apollo query/mutation wrappers, useful to take advantage
// of the `context` shape specific to MC queries.
export { useMcQuery, useMcLazyQuery, useMcMutation };
