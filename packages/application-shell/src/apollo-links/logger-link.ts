/* This link is a modifed version of the https://github.com/blackxored/apollo-link-logger
but it uses the new `@apollo/client` imports. */
import type {
  DefinitionNode,
  OperationDefinitionNode,
  OperationTypeNode,
} from 'graphql';
import type { Operation } from '@apollo/client';

import { ApolloLink } from '@apollo/client';
import logger from '../utils/logger';

const formatMessage = (
  operationType: OperationTypeNode,
  operation: Operation,
  ellapsed: number
) => {
  const headerCss = [
    'color: gray; font-weight: lighter', // title
    `color: ${operationType === 'query' ? '#03A9F4' : 'red'};`, // operationType
    'color: inherit;', // operationName
  ];

  const parts = [
    '%c apollo',
    `%c${operationType}`,
    `%c${operation.operationName}`,
  ];

  if (operationType !== 'subscription') {
    parts.push(`%c(in ${ellapsed} ms)`);
    headerCss.push('color: gray; font-weight: lighter;'); // time
  }

  return [parts.join(' '), ...headerCss];
};

function isOperationNode(
  definition: DefinitionNode
): definition is OperationDefinitionNode {
  return (definition as OperationDefinitionNode).operation !== undefined;
}

const loggerLink = new ApolloLink((operation, forward) => {
  const startTime = new Date().getTime();

  return forward(operation).map((result) => {
    const definitionNode = operation.query.definitions[0];
    if (isOperationNode(definitionNode)) {
      const operationType = definitionNode.operation;
      const ellapsed = new Date().getTime() - startTime;

      const group = formatMessage(operationType, operation, ellapsed);

      logger.groupCollapsed(...group);
      logger.log('INIT', operation);
      logger.log('RESULT', result);
      logger.groupEnd();
    }
    return result;
  });
});

export default loggerLink;
