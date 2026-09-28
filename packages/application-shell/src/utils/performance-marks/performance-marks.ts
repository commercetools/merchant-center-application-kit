import {
  PERFORMANCE_MARKS,
  PERFORMANCE_MEASURE_SUFFIX,
  type TPerformanceMark,
} from '@commercetools-frontend/constants';

export { PERFORMANCE_MARKS };

export type { TPerformanceMark };

export type TShellPerformanceMark = Exclude<
  TPerformanceMark,
  typeof PERFORMANCE_MARKS.SKELETON_VISIBLE
>;

const alreadyMarked = new Set<TShellPerformanceMark>();

const markOnce = (performanceMark: TShellPerformanceMark) => {
  if (alreadyMarked.has(performanceMark)) return;
  if (!performance?.mark || !performance.measure) return;

  try {
    performance.mark(performanceMark);

    alreadyMarked.add(performanceMark);
    performance.measure(`${performanceMark}${PERFORMANCE_MEASURE_SUFFIX}`, {
      start: 0,
      end: performanceMark,
    });
  } catch {
    // Observational only; never break rendering.
  }
};

export default markOnce;
