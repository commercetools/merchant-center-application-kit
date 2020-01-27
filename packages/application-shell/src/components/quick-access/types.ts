import { DocumentNode } from 'graphql';
import { ApolloQueryResult } from 'apollo-client';
import { OperationVariables } from '@apollo/react-common';

export type ActionAsFn = () => void;
export type SubCommandAsFn = (
  execQuery: ExecGraphQlQuery
) => Promise<Command[]>;
export type Action = {
  type: string;
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
  variables: OperationVariables
) => Promise<ApolloQueryResult<T>['data']>;
