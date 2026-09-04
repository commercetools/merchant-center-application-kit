export const PERFORMANCE_MARKS = {
  SKELETON_VISIBLE: 'mc:skeleton-visible',
  SHELL_CHROME_MOUNTED: 'mc:shell-chrome-mounted',
  INTL_READY: 'mc:intl-ready',
  CONTENT_RENDERED: 'mc:content-rendered',
  HYDRATION_USER: 'mc:hydration-user',
  HYDRATION_PROJECT: 'mc:hydration-project',
} as const;

export type TPerformanceMark =
  (typeof PERFORMANCE_MARKS)[keyof typeof PERFORMANCE_MARKS];

// Excludes `mc:skeleton-visible`, which FEC-1298 emits from mc-html-template's
// inline script. `alreadyMarked` cannot see marks made outside this module.
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
    // Between the two calls: a failed `mark` should retry, a failed `measure`
    // must not emit a second entry.
    alreadyMarked.add(performanceMark);
    performance.measure(`${performanceMark}:from-nav`, {
      start: 0,
      end: performanceMark,
    });
  } catch {
    // Observational only; never break rendering.
  }
};

export default markOnce;
