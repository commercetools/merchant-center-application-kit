import React from 'react';
import { OperationVariables } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import { useApolloClient } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import isUUID from '../../../utils/is-uuid';

type TLoadingWithPrefixSearchFieldsOptions = {
  query: DocumentNode;
  prefixSearchFields: string[];
};

const getPrefixSearchBounds = (input: string): [string, string] => {
  const getNextCharacter = (character: string) =>
    // take the last character and select the next charcode
    String.fromCharCode(character.charCodeAt(character.length - 1) + 1);

  const upperBound = `${input.slice(0, input.length - 1)}${getNextCharacter(
    input.slice(input.length - 1)
  )}`;

  return [input, upperBound];
};

const constructPrefixSearchPredicate = (
  prefixSearchFields: string[],
  lowerBound: string,
  upperBound: string
): string => {
  const constructPrefixSearchExpression = (field: string) => {
    const parts = field.split('.');
    const [valueToNest, ...reversedPathToNestedValue] = parts.slice().reverse();
    const comparison = `${valueToNest} >= "${lowerBound}" and ${valueToNest} < "${upperBound}"`;
    if (reversedPathToNestedValue.length) {
      return reversedPathToNestedValue.reduce(
        (nextNestedValue, nestedSelection) =>
          `${nestedSelection}(${nextNestedValue})`,
        comparison
      );
    }
    return comparison;
  };
  return prefixSearchFields.map(constructPrefixSearchExpression).join(' or ');
};

export const getPrefixSearchWherePredicate = (
  inputValue: string,
  prefixSearchFields: string[]
) => {
  const [lowerBound, upperBound] = getPrefixSearchBounds(inputValue);
  return constructPrefixSearchPredicate(
    prefixSearchFields,
    lowerBound,
    upperBound
  );
};

const useLoadWithPrefixSearchFields = (
  options: TLoadingWithPrefixSearchFieldsOptions
) => {
  const { query, prefixSearchFields } = options;
  const apolloClient = useApolloClient();
  const loadWithPrefixSearchFields = React.useCallback(
    ({
      inputValue,
      variables,
    }: {
      variables?: OperationVariables;
      inputValue: string;
    }) => {
      const wherePredicate = isUUID(inputValue)
        ? `id = "${inputValue}"`
        : getPrefixSearchWherePredicate(inputValue, prefixSearchFields);

      return apolloClient.query({
        query,
        context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
        variables: { ...variables, where: wherePredicate },
      });
    },
    [query, prefixSearchFields, apolloClient]
  );
  return loadWithPrefixSearchFields;
};

export default useLoadWithPrefixSearchFields;
