import * as Sentry from '@sentry/browser';
import sentryTestkit from 'sentry-testkit';
import waitForExpect from 'wait-for-expect';
import { reportErrorToSentry } from './sentry';

const { testkit, sentryTransport } = sentryTestkit();

const DUMMY_DSN = 'https://acacaeaccacacacabcaacdacdacadaca@sentry.io/000001';

describe('reportErrorToSentry', () => {
  let error;

  beforeAll(() => {
    Sentry.init({
      dsn: DUMMY_DSN,
      release: 'test',
      transport: sentryTransport,
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
});
