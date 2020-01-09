import { graphql, buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';
import { formatApolloErrors } from 'apollo-server-errors';
import loadSchema from './load-schema';

const getRootValue = (operations, operationName, variables) => {
  if (!operationName || !operations[operationName]) {
    return {};
  }
  const op = operations[operationName];
  if (typeof op === 'function') {
    try {
      return op(variables);
    } catch (e) {
      return e; // properly handle dynamic throw new GraphQLError("message")
    }
  }
  return op;
};

const createGraphqlMockServer = (
  xhrMock,
  { mocksByTarget = {}, operationsByTarget = {}, onRequest } = {}
) => {
  const processGraphQLRequest = async (targetName, req, res) => {
    const schema = buildClientSchema(loadSchema(targetName));
    const mocks = mocksByTarget[targetName] || {};
    const operations = operationsByTarget[targetName] || {};
    addMockFunctionsToSchema({
      schema,
      mocks,
    });
    const { query, variables, operationName } = JSON.parse(req.body());
    const rootValue = getRootValue(operations, operationName, variables);
    let response;
    try {
      response = await graphql({
        schema,
        source: query,
        variableValues: variables,
        rootValue,
      });
    } catch (error) {
      // https://github.com/apollographql/apollo-server/blob/61e69412c0aa88b358a2eef4ba635e8618db9946/packages/apollo-server-core/src/runHttpQuery.ts#L295-L297
      response = { error: formatApolloErrors([error]) };
    }
    return res.status(200).body(JSON.stringify(response));
  };
  const handleProxyGraphQLRequest = async (req, res) => {
    const { variables } = JSON.parse(req.body());
    const targetName = variables.target;
    return await processGraphQLRequest(targetName, req, res);
  };

  xhrMock.post('http://localhost:8080/graphql', async (req, res) => {
    if (onRequest) {
      const next = async () => {
        return await handleProxyGraphQLRequest(req, res);
      };
      return await onRequest(req, res, next);
    }
    return await handleProxyGraphQLRequest(req, res);
  });
  xhrMock.post(/\/api\/graphql$/, async (req, res) => {
    return await processGraphQLRequest('proxy', req, res);
  });
};

export default createGraphqlMockServer;
