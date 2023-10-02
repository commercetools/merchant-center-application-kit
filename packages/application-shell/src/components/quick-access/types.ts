import type { OperationVariables, ApolloQueryResult } from '@apollo/client';
import type { DocumentNode } from 'graphql';
// import type { TApolloContext } from '../../utils/apollo-context';
import type { TApolloContext } from '@commercetools-frontend/application-shell-connectors';

export const actionTypes = {
  go: 'go',
} as const;

export type ActionAsFn = () => void;
export type SubCommandAsFn = (
  execQuery: ExecGraphQlQuery
) => Promise<Command[]>;
export type Action = {
  type: typeof actionTypes.go;
  to: string;
};
export type Command = {
  id: string;
  text: string;
  keywords?: string[];
  action: ActionAsFn | Action;
  subCommands?: SubCommandAsFn | Command[];
};
export type SearchText = string;
export type SelectedResult = number;
export type Stack = {
  searchText: SearchText;
  results: Command[];
  selectedResult: SelectedResult;
};
export type HistoryEntry = {
  searchText: SearchText;
  results: Command[];
};
export type ExecGraphQlQuery = <T>(
  document: DocumentNode,
  variables: OperationVariables,
  context?: TApolloContext
) => Promise<ApolloQueryResult<T>['data']>;
