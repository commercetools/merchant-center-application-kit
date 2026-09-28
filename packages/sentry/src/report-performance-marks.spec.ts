import type { TransactionEvent } from '@sentry/types';
import {
  PERFORMANCE_MARKS,
  PERFORMANCE_MEASURE_SUFFIX,
} from '@commercetools-frontend/constants';
import { addPerformanceMeasurementsToTransaction } from './report-performance-marks';

const originalPerformance = globalThis.performance;

const setPerformance = (value: unknown) => {
  Object.defineProperty(globalThis, 'performance', {
    configurable: true,
    writable: true,
    value,
  });
};

const measureEntry = (name: string, duration: number) => ({ name, duration });

const createPageloadEvent = (
  overrides: Partial<TransactionEvent> = {}
): TransactionEvent => ({
  type: 'transaction',
  contexts: { trace: { op: 'pageload', span_id: 'a', trace_id: 'b' } },
  ...overrides,
});

const defaultMeasures = [
  measureEntry('mc:skeleton-visible:from-nav', 120.5),
  measureEntry('mc:intl-ready:from-nav', 800),
  measureEntry('mc:shell-chrome-mounted:from-nav', 801),
  measureEntry('mc:content-rendered:from-nav', 1400),
  measureEntry('mc:hydration-user:from-nav', 900),
  measureEntry('mc:hydration-project:from-nav', 1200),
];

describe('addPerformanceMeasurementsToTransaction', () => {
  beforeEach(() => {
    setPerformance({
      getEntriesByType: jest.fn(() => defaultMeasures),
    });
  });

  afterEach(() => {
    setPerformance(originalPerformance);
  });

  it('attaches a measurement for every mark the shell and template emit', () => {
    setPerformance({
      getEntriesByType: jest.fn(() =>
        Object.values(PERFORMANCE_MARKS).map((mark, index) =>
          measureEntry(`${mark}${PERFORMANCE_MEASURE_SUFFIX}`, index + 1)
        )
      ),
    });

    const event = addPerformanceMeasurementsToTransaction(
      createPageloadEvent()
    );

    expect(Object.keys(event.measurements ?? {}).sort()).toEqual(
      Object.values(PERFORMANCE_MARKS)
        .map((mark) => mark.replace(/:/g, '.'))
        .sort()
    );
  });

  it('attaches every mc:* measure to a pageload transaction', () => {
    const event = addPerformanceMeasurementsToTransaction(
      createPageloadEvent()
    );

    expect(event.measurements).toEqual({
      'mc.skeleton-visible': { value: 120.5, unit: 'millisecond' },
      'mc.intl-ready': { value: 800, unit: 'millisecond' },
      'mc.shell-chrome-mounted': { value: 801, unit: 'millisecond' },
      'mc.content-rendered': { value: 1400, unit: 'millisecond' },
      'mc.hydration-user': { value: 900, unit: 'millisecond' },
      'mc.hydration-project': { value: 1200, unit: 'millisecond' },
    });
  });

  it('mirrors the raw mark names onto the trace data', () => {
    const event = addPerformanceMeasurementsToTransaction(
      createPageloadEvent()
    );

    expect(event.contexts?.trace?.data).toMatchObject({
      'mc:intl-ready': 800,
      'mc:content-rendered': 1400,
    });
  });

  it('leaves navigation transactions untouched', () => {
    const event = createPageloadEvent();
    event.contexts!.trace!.op = 'navigation';
    const snapshot = JSON.parse(JSON.stringify(event));

    expect(addPerformanceMeasurementsToTransaction(event)).toEqual(snapshot);
  });

  it('leaves events without a trace context untouched', () => {
    const event: TransactionEvent = { type: 'transaction' };

    expect(() => addPerformanceMeasurementsToTransaction(event)).not.toThrow();
    expect(event.measurements).toBeUndefined();
  });

  it('does nothing when getEntriesByType is unavailable', () => {
    setPerformance({});
    const event = createPageloadEvent();

    expect(() => addPerformanceMeasurementsToTransaction(event)).not.toThrow();
    expect(event.measurements).toBeUndefined();
  });

  it('returns the event when getEntriesByType throws', () => {
    setPerformance({
      getEntriesByType: jest.fn(() => {
        throw new TypeError('nope');
      }),
    });
    const event = createPageloadEvent();

    expect(addPerformanceMeasurementsToTransaction(event)).toBe(event);
  });

  it('does not overwrite existing measurements', () => {
    const event = createPageloadEvent({
      measurements: { 'mc.intl-ready': { value: 1, unit: 'millisecond' } },
    });

    addPerformanceMeasurementsToTransaction(event);

    expect(event.measurements?.['mc.intl-ready']).toEqual({
      value: 1,
      unit: 'millisecond',
    });
    expect(event.measurements?.['mc.content-rendered']).toEqual({
      value: 1400,
      unit: 'millisecond',
    });
  });

  it('ignores measures without the mc: prefix', () => {
    setPerformance({
      getEntriesByType: jest.fn(() => [
        measureEntry('vendor:thing:from-nav', 5),
        measureEntry('mc:intl-ready:from-nav', 800),
        measureEntry('mc:not-a-nav-measure', 7),
      ]),
    });

    const event = addPerformanceMeasurementsToTransaction(
      createPageloadEvent()
    );

    expect(Object.keys(event.measurements ?? {})).toEqual(['mc.intl-ready']);
  });
});
