import * as Sentry from '@sentry/react';
import { addPerformanceMeasurementsToTransaction } from './report-performance-marks';
import { boot } from './sentry';

jest.mock('@sentry/react', () => ({
  ...jest.requireActual('@sentry/react'),
  init: jest.fn(),
  getCurrentScope: jest.fn(() => ({ setTag: jest.fn() })),
  getClient: jest.fn(),
}));

jest.mock('./report-performance-marks', () => ({
  addPerformanceMeasurementsToTransaction: jest.fn((event) => event),
}));

describe('boot', () => {
  beforeEach(() => {
    // @ts-expect-error: only the fields `boot` reads.
    window.app = {
      trackingSentry: 'https://key@sentry.io/1',
      revision: 'rev',
      env: 'test',
      location: 'eu',
      cdnUrl: 'http://cdn',
      frontendHost: 'http://mc',
      applicationName: 'test-app',
    };
  });

  it('wires the performance measurements handler into Sentry.init', () => {
    boot();

    const { beforeSendTransaction } = (Sentry.init as jest.Mock).mock
      .calls[0][0];
    const event = { type: 'transaction' };
    beforeSendTransaction(event);

    expect(addPerformanceMeasurementsToTransaction).toHaveBeenCalledWith(event);
  });

  it('enables the GraphQL client integration so spans carry the operation name', () => {
    boot();

    const { integrations } = (Sentry.init as jest.Mock).mock.calls[0][0];
    expect(integrations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'GraphQLClient' }),
      ])
    );
  });

  describe('IP address collection', () => {
    // The v8 SDK sent no IP; Sentry inferred it server-side. v10 tells Sentry
    // `infer_ip: 'never'` unless `sendDefaultPii` is set, which would also send
    // cookies, headers and bodies. We opt into the inference on its own.
    const getInitOptions = () => {
      boot();
      return (Sentry.init as jest.Mock).mock.calls[0][0];
    };

    beforeEach(() => {
      (Sentry.init as jest.Mock).mockClear();
    });

    it('opts into IP inference without sendDefaultPii', () => {
      const options = getInitOptions();

      expect(options.sendDefaultPii).toBeUndefined();

      // Run the real SDK init to check the setting survives its own defaults.
      const actual = jest.requireActual('@sentry/react');
      actual.init({
        ...options,
        dsn: 'https://key@sentry.io/1',
        defaultIntegrations: false,
        integrations: [],
        transport: () => ({ send: async () => ({}), flush: async () => true }),
      });
      const { sdk } = actual.getClient().getOptions()._metadata;

      expect(sdk.settings).toEqual({ infer_ip: 'auto' });
      expect(sdk.name).toBe('sentry.javascript.react');
    });

    it('asks Sentry to infer the IP for sessions', () => {
      const on = jest.fn();
      (Sentry.getClient as jest.Mock).mockReturnValue({ on });

      boot();

      expect(on).toHaveBeenCalledWith(
        'beforeSendSession',
        expect.any(Function)
      );
      const session = { status: 'ok' };
      on.mock.calls[0][1](session);
      expect(session).toEqual({ status: 'ok', ipAddress: '{{auto}}' });
    });
  });

  describe('GraphQL documents', () => {
    // `graphqlClientIntegration` attaches the query text by default. A query
    // with an inline literal could carry personal data, so it never leaves.
    const getInitOptions = () => {
      boot();
      return (Sentry.init as jest.Mock).mock.calls[0][0];
    };

    beforeEach(() => {
      (Sentry.init as jest.Mock).mockClear();
    });

    it('removes the document from breadcrumbs but keeps the operation', () => {
      const breadcrumb = getInitOptions().beforeBreadcrumb({
        category: 'fetch',
        type: 'http',
        data: {
          url: 'https://mc-api.example.com/graphql',
          'graphql.operation': 'query FetchProject',
          'graphql.document': 'query FetchProject { project(key: "a@b.c") }',
        },
      });

      expect(breadcrumb.data).toEqual({
        url: 'https://mc-api.example.com/graphql',
        'graphql.operation': 'query FetchProject',
      });
    });

    it('keeps breadcrumbs without data untouched', () => {
      const breadcrumb = { category: 'ui.click', message: 'button' };

      expect(getInitOptions().beforeBreadcrumb(breadcrumb)).toEqual(breadcrumb);
    });

    it('removes the document from every span of a transaction', () => {
      const event = getInitOptions().beforeSendTransaction({
        type: 'transaction',
        contexts: {
          trace: { op: 'navigation', data: { 'graphql.document': 'q' } },
        },
        spans: [
          { op: 'http.client', data: { 'graphql.document': 'q', other: 1 } },
          { op: 'ui.render' },
        ],
      });

      expect(event.contexts.trace.data).toEqual({});
      expect(event.spans[0].data).toEqual({ other: 1 });
      expect(event.spans[1]).toEqual({ op: 'ui.render' });
    });
  });
});
