import { graphql, buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';
import { formatApolloErrors } from 'apollo-server-errors';
import mcSchemaIntrospectionResult from '../../../../schemas/mc.json';
import proxySchemaIntrospectionResult from '../../../../schemas/proxy.json';
import * as mcFixtures from './fixtures/mc';
import * as proxyFixtures from './fixtures/proxy';

const getSchemaIntrospectionFor = targetName => {
  switch (targetName) {
    case 'mc':
      return mcSchemaIntrospectionResult.data;
    case 'proxy':
      return proxySchemaIntrospectionResult.data;
    default:
      throw new Error(`Unknown target ${targetName}`);
  }
};

const schemas = {
  mc: buildClientSchema(getSchemaIntrospectionFor('mc')),
  proxy: buildClientSchema(getSchemaIntrospectionFor('proxy')),
};

const getDefaultFixturesFor = targetName => {
  switch (targetName) {
    case 'mc':
      return mcFixtures.defaultFixtures;
    case 'proxy':
      return proxyFixtures.defaultFixtures;
    default:
      throw new Error(`Unknown target ${targetName}`);
  }
};

const getMockedSchemaFor = (
  targetName,
  customFixtures = {},
  customResolvers = {}
) => {
  switch (targetName) {
    case 'mc': {
      const schema = schemas.mc;
      addMockFunctionsToSchema({
        schema,
        mocks: mcFixtures.createResolvers(
          customFixtures.mc,
          customResolvers.mc
        ),
        preserveResolvers: true,
      });
      return schema;
    }
    case 'proxy': {
      const schema = schemas.proxy;
      addMockFunctionsToSchema({
        schema,
        mocks: proxyFixtures.createResolvers(
          customFixtures.proxy,
          customResolvers.proxy
        ),
        preserveResolvers: true,
      });
      return schema;
    }
    default:
      throw new Error(`Unknown target ${targetName}`);
  }
};

const createGraphqlMockServer = (
  xhrMock,
  { fixtures, resolvers, onRequest } = {}
) => {
  const mockedSchemas = {
    mc: getMockedSchemaFor('mc', fixtures, resolvers),
    proxy: getMockedSchemaFor('proxy', fixtures, resolvers),
  };

  const processGraphQLRequest = async (targetName, req, res) => {
    const { query, variables } = JSON.parse(req.body());
    let response;
    try {
      response = await graphql(
        mockedSchemas[targetName],
        query,
        null,
        null,
        variables
      );
    } catch (error) {
      // https://github.com/apollographql/apollo-server/blob/61e69412c0aa88b358a2eef4ba635e8618db9946/packages/apollo-server-core/src/runHttpQuery.ts#L295-L297
      response = { error: formatApolloErrors([error]) };
    }
    // console.log(
    //   'response',
    //   JSON.stringify(response),
    //   targetName,
    //   query,
    //   variables
    // );
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

export { getDefaultFixturesFor, createGraphqlMockServer };
