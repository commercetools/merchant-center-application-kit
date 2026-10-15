import { graphqlClientIntegration } from '@sentry/browser';
import * as Sentry from '@sentry/react';
import sentryTestkit from 'sentry-testkit';
import waitForExpect from 'wait-for-expect';
import { boot } from './sentry';

const mockInit = jest.fn();

jest.mock('@sentry/react', () => ({
  ...jest.requireActual('@sentry/react'),
  init: (options: unknown) => mockInit(options),
}));

const { testkit, sentryTransport } = sentryTestkit();

describe('GraphQL document', () => {
  const originalFetch = window.fetch;

  beforeAll(() => {
    // @ts-expect-error: only the fields `boot` reads.
    window.app = {
      trackingSentry: 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/1',
      cdnUrl: 'http://cdn',
      frontendHost: 'http://mc',
    };
    boot();
    // jsdom has no Performance Timeline; the tracing integration reads it.
    window.performance.getEntriesByType = jest.fn(() => []);
    window.fetch = jest.fn(async () => new Response('{}', { status: 200 }));

    // The real SDK, with the options `boot()` builds and a recording transport.
    jest.requireActual('@sentry/react').init({
      ...mockInit.mock.calls[0][0],
      // Test stack frames are not served from the CDN.
      allowUrls: undefined,
      transport: sentryTransport,
      tracesSampleRate: 1,
      integrations: [
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

  it('keeps the operation but never sends the query text', async () => {
    await Sentry.startSpan({ name: 'test-transaction', op: 'test' }, () =>
      window.fetch('https://mc-api.example.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'query FetchProject { project(key: "a@b.c") { key } }',
        }),
      })
    );
    Sentry.captureException(new Error('boom'));

    await waitForExpect(() => {
      expect(testkit.transactions()).toHaveLength(1);
      expect(testkit.reports()).toHaveLength(1);
    });
    const sent = JSON.stringify([
      testkit.transactions()[0],
      testkit.reports()[0].originalReport,
    ]);

    expect(sent).toContain('query FetchProject');
    expect(sent).not.toContain('a@b.c');
    expect(sent).not.toContain('graphql.document');
  });
});
