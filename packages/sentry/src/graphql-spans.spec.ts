import { graphqlClientIntegration } from '@sentry/browser';
import * as Sentry from '@sentry/react';
import sentryTestkit from 'sentry-testkit';
import waitForExpect from 'wait-for-expect';

const { testkit, sentryTransport } = sentryTestkit();

const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001';
const GRAPHQL_URL = 'https://mc-api.example.com/graphql';

describe('GraphQL spans', () => {
  const originalFetch = window.fetch;

  beforeAll(() => {
    // jsdom has no Performance Timeline; the tracing integration reads it.
    window.performance.getEntriesByType = jest.fn(() => []);
    // The SDK wraps `window.fetch` during init, so stub it first.
    window.fetch = jest.fn(async () => new Response('{}', { status: 200 }));
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      transport: sentryTransport,
      tracesSampleRate: 1,
      integrations: [
        // Provides the `http.client` fetch spans, as in `boot()`.
        Sentry.browserTracingIntegration({
          instrumentPageLoad: false,
          instrumentNavigation: false,
        }),
        graphqlClientIntegration({ endpoints: [/\/graphql$/] }),
      ],
    });
  });

  afterAll(() => {
    window.fetch = originalFetch;
  });

  it('names the http.client span after the GraphQL operation', async () => {
    await Sentry.startSpan({ name: 'test-transaction', op: 'test' }, () =>
      window.fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'query FetchProject { project { key } }',
          operationName: 'FetchProject',
        }),
      })
    );

    await waitForExpect(() => expect(testkit.transactions()).toHaveLength(1));
    const spans = testkit.transactions()[0].spans ?? [];
    expect(spans.map((span) => span.description)).toEqual([
      'POST https://mc-api.example.com/graphql (query FetchProject)',
    ]);
  });
});
