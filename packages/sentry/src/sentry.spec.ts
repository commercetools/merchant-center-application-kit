import * as Sentry from '@sentry/browser';
import sentryTestkit from 'sentry-testkit';
import waitForExpect from 'wait-for-expect';
import { reportErrorToSentry, redactUnsafeEventFields } from './sentry';

const { testkit, sentryTransport } = sentryTestkit();

const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001';

// At the moment, jsdom doesn't support PromiseRejectionEvent type. That leads to
// ReferenceError in tests. So, we add this ad-hoc polyfill just for tests for now.
// Once the following issue is fixed (which is unlikely to happen any soon) in jsdom
// we can drop this polyfill: https://github.com/jsdom/jsdom/issues/2401

type Reason = unknown;
type Payload = unknown;

class PromiseRejectionEvent extends Event {
  reason: Reason;
  promise: Promise<Payload>;

  constructor(
    type: string,
    options: { reason: Reason; promise: Promise<Payload> }
  ) {
    super(type);
    this.promise = options.promise;
    this.reason = options.reason;
  }
}

describe('reporting to sentry', () => {
  let error;

  beforeAll(() => {
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      transport: () => new sentryTransport(),
    });
  });

  beforeEach(() => {
    console.error = jest.fn();
    testkit.reset();
  });

  describe('without extra info', () => {
    beforeEach(async () => {
      error = new Error('Boom');
      reportErrorToSentry(error, undefined, () => true);

      // Wait for the reports to have been sent
      // eslint-disable-next-line jest/no-standalone-expect
      await waitForExpect(() => expect(testkit.reports()).toHaveLength(1));
    });

    it('should send report', () => {
      const report = testkit.reports()[0];
      expect(report.error).toMatchObject({
        message: 'Boom',
      });
      expect(report).toHaveProperty('extra', undefined);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(report.originalReport.event_id as string)
      );
    });
  });

  describe('with extra info as object', () => {
    beforeEach(async () => {
      error = new Error('Boom');
      reportErrorToSentry(error, { extra: { name: 'foo' } }, () => true);

      // Wait for the reports to have been sent
      // eslint-disable-next-line jest/no-standalone-expect
      await waitForExpect(() => expect(testkit.reports()).toHaveLength(1));
    });

    it('should send report with extra info', () => {
      const report = testkit.reports()[0];
      expect(report).toHaveProperty('extra', { name: 'foo' });
    });
  });

  describe('with extra info as string', () => {
    beforeEach(async () => {
      error = new Error('Boom');
      reportErrorToSentry(error, { extra: 'hello' }, () => true);

      // Wait for the reports to have been sent
      // eslint-disable-next-line jest/no-standalone-expect
      await waitForExpect(() => expect(testkit.reports()).toHaveLength(1));
    });

    it('should send report with extra info', () => {
      const report = testkit.reports()[0];
      expect(report).toHaveProperty(
        'extra',
        expect.objectContaining({ extra: 'hello' })
      );
    });
  });

  describe('when error is a string', () => {
    describe('when sentry is not enabled', () => {
      beforeEach(() => {
        console.warn = jest.fn();
        error = 'Boom';
        reportErrorToSentry(error, undefined, () => false);
      });

      it('should warn about malformed error object', () => {
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining(
            `You called "reportErrorToSentry" with a string argument`
          )
        );
      });
    });
  });

  describe('when error is an ErrorEvent', () => {
    beforeEach(async () => {
      error = new ErrorEvent('error', { message: 'something went wrong' });
      reportErrorToSentry(error, undefined, () => true);

      // Wait for the reports to have been sent
      // eslint-disable-next-line jest/no-standalone-expect
      await waitForExpect(() => expect(testkit.reports()).toHaveLength(1));
    });

    it('should send report', () => {
      const report = testkit.reports()[0];
      expect(report.error).toMatchObject({
        message: 'something went wrong',
      });
    });
  });

  describe('when error is an PromiseRejectionEvent', () => {
    beforeEach(async () => {
      error = new PromiseRejectionEvent('unhandledrejection', {
        // That's supposed to be Promise.reject, but jsdom throws in this case
        promise: Promise.resolve(null),
        reason: { message: 'something went wrong' },
      });

      reportErrorToSentry(error, undefined, () => true);

      // Wait for the reports to have been sent
      // eslint-disable-next-line jest/no-standalone-expect
      await waitForExpect(() => expect(testkit.reports()).toHaveLength(1));
    });

    it('should send report', () => {
      const report = testkit.reports()[0];
      expect(report.error).toMatchObject({
        message: '{"message":"something went wrong"}',
      });
    });
  });
});

describe('when using unsafe fields', () => {
  it('should redact unsafe fields', () => {
    type EventExtra = {
      payload?: {
        firstName: string;
      };
      actions?: Array<{
        lastName: string;
      }>;
    };
    let safeFields = redactUnsafeEventFields({
      user: {
        email: 'john@doeland.com',
      },
    });

    expect(safeFields.user?.email).toEqual('[Redacted]');

    safeFields = redactUnsafeEventFields({
      extra: {
        payload: {
          firstName: 'John',
        },
      },
    });

    expect((safeFields.extra as EventExtra).payload?.firstName).toEqual(
      '[Redacted]'
    );

    safeFields = redactUnsafeEventFields({
      extra: {
        actions: [{ lastName: 'Doe' }],
      },
    });

    expect((safeFields.extra as EventExtra).actions?.[0].lastName).toEqual(
      '[Redacted]'
    );
  });
});
