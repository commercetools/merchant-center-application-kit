import { graphql } from 'msw';
import { ApolloLink, gql } from '@apollo/client';
import { setupServer } from 'msw/node';
import createApolloClient from './configure-apollo';

const DUMMY_GRAPHQL_QUERY = gql`
  query DummyQuery {
    getStatus {
      status
      headers
    }
  }
`;

const mockServer = setupServer();

describe('configureApollo', () => {
  beforeAll(() =>
    mockServer.listen({
      onUnhandledRequest: 'error',
    })
  );

  beforeEach(() => {
    jest.clearAllMocks();

    mockServer.use(
      graphql.query('DummyQuery', (req, res, ctx) =>
        res(
          ctx.data({
            getStatus: {
              status: 'ok',
              headers: req.headers.all(),
            },
          })
        )
      )
    );
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => mockServer.close());

  it('create basic apollo client', async () => {
    const client = createApolloClient();

    const response = await client.query({
      query: DUMMY_GRAPHQL_QUERY,
      context: {
        target: 'mc',
      },
    });

    expect(response.data.getStatus.status).toEqual('ok');
  });

  it('create client with custom links configuration', async () => {
    const customHeaderLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          'X-Custom-Header': 'custom-value',
        },
      });
      return forward(operation);
    });

    const client = createApolloClient({
      customLinks: [customHeaderLink],
    });

    const response = await client.query({
      query: DUMMY_GRAPHQL_QUERY,
      context: {
        target: 'mc',
      },
    });

    expect(response.data.getStatus.headers).toEqual(
      expect.objectContaining({
        'x-custom-header': 'custom-value',
      })
    );
  });
});
