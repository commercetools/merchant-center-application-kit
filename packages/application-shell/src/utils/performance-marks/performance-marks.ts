export const PERFORMANCE_MARKS = {
  SKELETON_VISIBLE: 'mc:skeleton-visible',
  SHELL_CHROME_MOUNTED: 'mc:shell-chrome-mounted',
  INTL_READY: 'mc:intl-ready',
  CONTENT_RENDERED: 'mc:content-rendered',
  HYDRATION_USER: 'mc:hydration-user',
  HYDRATION_PROJECT: 'mc:hydration-project',
  // Whether the parse-time locale hint resolved to the same catalogue as
  // `user.language`. Both map through `mapLocaleToIntlLocale`, so only a
  // bucket crossing is a miss.
  LOCALE_HINT_HIT: 'mc:locale-hint-hit',
  LOCALE_HINT_MISS: 'mc:locale-hint-miss',
} as const;

export type TPerformanceMark =
  (typeof PERFORMANCE_MARKS)[keyof typeof PERFORMANCE_MARKS];

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
    performance.measure(`${performanceMark}:from-nav`, {
      start: 0,
      end: performanceMark,
    });
  } catch {
    // Observational only; never break rendering.
  }
};

export default markOnce;
