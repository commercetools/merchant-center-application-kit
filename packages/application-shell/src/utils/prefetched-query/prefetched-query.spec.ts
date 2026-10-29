import { rest } from 'msw';
import { gql } from '@apollo/client';
import { setupServer } from 'msw/node';

type TPrefetchedQueryModule = typeof import('./prefetched-query');

// The module keeps the prefetched responses in module state, so each test
// loads a fresh copy.
const loadModule = (): TPrefetchedQueryModule => {
  jest.resetModules();
  return require('./prefetched-query');
};

const query = gql`
  query FetchLoggedInUser {
    user: me {
      id
      firstName
      projects {
        total
      }
    }
  }
`;

const mockServer = setupServer();
beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  mockServer.resetHandlers();
  document.head.innerHTML = '';
});
afterAll(() => mockServer.close());

const addPreloadTag = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.setAttribute('as', 'fetch');
  link.href = href;
  document.head.appendChild(link);
};

describe('findPrefetchUrl', () => {
  it('should find the preload tag matching the path and params', () => {
    const prefetchedQuery = loadModule();
    addPreloadTag('/__prefetch/user?applicationId=__internal%3Aorders');
    addPreloadTag(
      '/__prefetch/project?projectKey=p1&applicationId=__internal%3Aorders'
    );

    expect(
      prefetchedQuery.findPrefetchUrl('/__prefetch/project', {
        projectKey: 'p1',
        applicationId: '__internal:orders',
      })
    ).toBe(
      `${window.location.origin}/__prefetch/project?projectKey=p1&applicationId=__internal%3Aorders`
    );
  });
  it.each([
    [{ projectKey: 'p2', applicationId: '__internal:orders' }],
    [{ projectKey: 'p1', applicationId: '__internal:products' }],
    [{ projectKey: undefined, applicationId: '__internal:orders' }],
  ])('should not match the params %p', (params) => {
    const prefetchedQuery = loadModule();
    addPreloadTag(
      '/__prefetch/project?projectKey=p1&applicationId=__internal%3Aorders'
    );

    expect(
      prefetchedQuery.findPrefetchUrl('/__prefetch/project', params)
    ).toBeUndefined();
  });
  it('should ignore preload tags of other origins', () => {
    const prefetchedQuery = loadModule();
    addPreloadTag(
      'https://example.com/__prefetch/user?applicationId=__internal%3Aorders'
    );

    expect(
      prefetchedQuery.findPrefetchUrl('/__prefetch/user', {
        applicationId: '__internal:orders',
      })
    ).toBeUndefined();
  });
});

describe('readPrefetchedData', () => {
  const url = `${window.location.origin}/__prefetch/user?applicationId=a%3Ab`;
  const user = {
    __typename: 'User',
    id: 'u1',
    firstName: 'John',
    projects: { __typename: 'ProjectQueryResult', total: 1 },
  };

  it('should return the data of a complete result and consume the url', async () => {
    const prefetchedQuery = loadModule();
    mockServer.use(
      rest.get('*/__prefetch/user', (_req, res, ctx) =>
        res(ctx.json({ data: { user } }))
      )
    );

    await expect(
      prefetchedQuery.readPrefetchedData(url, query)
    ).resolves.toEqual({ user });
    expect(prefetchedQuery.isPrefetchUrlConsumed(url)).toBe(true);
  });
  it('should fetch the url only once', async () => {
    const prefetchedQuery = loadModule();
    const handler = jest.fn((_req, res, ctx) =>
      res(ctx.json({ data: { user } }))
    );
    mockServer.use(rest.get('*/__prefetch/user', handler));

    await Promise.all([
      prefetchedQuery.readPrefetchedData(url, query),
      prefetchedQuery.readPrefetchedData(url, query),
    ]);

    expect(handler).toHaveBeenCalledTimes(1);
  });
  it.each([
    [
      'GraphQL errors',
      200,
      {
        errors: [{ extensions: { code: 'UNAUTHENTICATED' } }],
        data: { user: null },
      },
    ],
    ['a null root field', 200, { data: { user: null } }],
    [
      'missing fields',
      200,
      { data: { user: { __typename: 'User', id: 'u1', firstName: 'John' } } },
    ],
    ['a timeout', 504, {}],
  ])('should return undefined for %s', async (_case, status, body) => {
    const prefetchedQuery = loadModule();
    mockServer.use(
      rest.get('*/__prefetch/user', (_req, res, ctx) =>
        res(ctx.status(status), ctx.json(body))
      )
    );

    await expect(
      prefetchedQuery.readPrefetchedData(url, query)
    ).resolves.toBeUndefined();
  });
  it('should return undefined if the request fails', async () => {
    const prefetchedQuery = loadModule();
    // msw logs the simulated network error.
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockServer.use(
      rest.get('*/__prefetch/user', (_req, res) => res.networkError('Failed'))
    );

    await expect(
      prefetchedQuery.readPrefetchedData(url, query)
    ).resolves.toBeUndefined();
    jest.mocked(console.error).mockRestore();
  });
});
