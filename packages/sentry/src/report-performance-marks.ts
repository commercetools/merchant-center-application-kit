import type { TransactionEvent } from '@sentry/types';

const MEASURE_SUFFIX = ':from-nav';

// Sentry measurement names may not contain colons (Relay restricts them to
// alphanumerics, `-`, `_`, `.`), so `mc:intl-ready:from-nav` becomes
// `mc.intl-ready`.
const toMeasurementKey = (measureName: string) =>
  measureName.slice(0, -MEASURE_SUFFIX.length).replace(/:/g, '.');

export function addPerformanceMeasurementsToTransaction(
  event: TransactionEvent
): TransactionEvent {
  // The document's `mc:*` measures describe the original page load. Navigation
  // transactions belong to SPA route changes and must not repeat them.
  if (event.contexts?.trace?.op !== 'pageload') return event;
  if (!performance?.getEntriesByType) return event;

  try {
    const markMeasures = performance
      .getEntriesByType('measure')
      .filter(
        (entry) =>
          entry.name.startsWith('mc:') && entry.name.endsWith(MEASURE_SUFFIX)
      );

    for (const entry of markMeasures) {
      const key = toMeasurementKey(entry.name);
      event.measurements = event.measurements ?? {};
      if (!(key in event.measurements)) {
        event.measurements[key] = {
          value: entry.duration,
          unit: 'millisecond',
        };
      }
      event.contexts.trace.data = {
        ...event.contexts.trace.data,
        [entry.name.slice(0, -MEASURE_SUFFIX.length)]: entry.duration,
      };
    }
  } catch {
    // A throw here would lose the whole transaction; the measurements are
    // not worth that.
  }

  return event;
}
