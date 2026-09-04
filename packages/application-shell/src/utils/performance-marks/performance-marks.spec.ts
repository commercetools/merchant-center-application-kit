// The test environment's `performance` global has no `mark`/`measure`, so they
// are stubbed rather than spied on.
const originalPerformance = globalThis.performance;

const setPerformance = (value: unknown) => {
  Object.defineProperty(globalThis, 'performance', {
    configurable: true,
    writable: true,
    value,
  });
};

// `markOnce` dedupes on a module-level `Set`, so every test needs a fresh
// module instance. Requiring after `resetModules` gives that.
const loadModule = () => {
  jest.resetModules();
  return require('./performance-marks');
};

describe('markOnce', () => {
  let mark: jest.Mock;
  let measure: jest.Mock;

  beforeEach(() => {
    mark = jest.fn();
    measure = jest.fn();
    setPerformance({ mark, measure });
  });

  afterEach(() => {
    setPerformance(originalPerformance);
  });

  it('marks and measures from the navigation origin', () => {
    const { default: markOnce, PERFORMANCE_MARKS } = loadModule();

    markOnce(PERFORMANCE_MARKS.INTL_READY);

    expect(mark).toHaveBeenCalledWith('mc:intl-ready');
    expect(measure).toHaveBeenCalledWith('mc:intl-ready:from-nav', {
      start: 0,
      end: 'mc:intl-ready',
    });
  });

  // This guard is what makes the marks correct despite the shell subtree
  // mounting twice on a cold load (the Suspense fallback in
  // application-shell-splitter.async.tsx renders the same children).
  it('keeps the first write and ignores repeat calls for the same mark', () => {
    const { default: markOnce, PERFORMANCE_MARKS } = loadModule();

    markOnce(PERFORMANCE_MARKS.CONTENT_RENDERED);
    markOnce(PERFORMANCE_MARKS.CONTENT_RENDERED);
    markOnce(PERFORMANCE_MARKS.CONTENT_RENDERED);

    expect(mark).toHaveBeenCalledTimes(1);
    expect(measure).toHaveBeenCalledTimes(1);
  });

  it('tracks each mark name independently', () => {
    const { default: markOnce, PERFORMANCE_MARKS } = loadModule();

    markOnce(PERFORMANCE_MARKS.HYDRATION_USER);
    markOnce(PERFORMANCE_MARKS.HYDRATION_PROJECT);

    expect(mark).toHaveBeenCalledTimes(2);
    expect(mark).toHaveBeenCalledWith('mc:hydration-user');
    expect(mark).toHaveBeenCalledWith('mc:hydration-project');
  });

  it('does nothing when the Performance API is unavailable', () => {
    const { default: markOnce, PERFORMANCE_MARKS } = loadModule();
    setPerformance({});

    expect(() =>
      markOnce(PERFORMANCE_MARKS.SHELL_CHROME_MOUNTED)
    ).not.toThrow();
    expect(measure).not.toHaveBeenCalled();
  });

  // `performance.measure`'s options-object form is newer than `mark`
  // (Safari 14.1+, Chrome 78+) and is a DOM API, so core-js does not polyfill
  // it. Marking without being able to measure would leave a mark the harness
  // cannot turn into a duration, so neither call should happen.
  it('does not mark when `measure` is unavailable', () => {
    const { default: markOnce, PERFORMANCE_MARKS } = loadModule();
    setPerformance({ mark });

    expect(() =>
      markOnce(PERFORMANCE_MARKS.SHELL_CHROME_MOUNTED)
    ).not.toThrow();
    expect(mark).not.toHaveBeenCalled();
  });

  // Timing instrumentation is observational. Callers invoke `markOnce` from
  // `useEffect`, where a throw surfaces as an uncaught React error and can
  // break shell mount.
  it('swallows errors thrown by the Performance API', () => {
    const { default: markOnce, PERFORMANCE_MARKS } = loadModule();
    const throwingMeasure = jest.fn(() => {
      throw new TypeError('measure is not supported in this form');
    });
    setPerformance({ mark, measure: throwingMeasure });

    expect(() => markOnce(PERFORMANCE_MARKS.INTL_READY)).not.toThrow();
    expect(throwingMeasure).toHaveBeenCalled();
  });

  it('does not retry a mark whose measure failed', () => {
    const { default: markOnce, PERFORMANCE_MARKS } = loadModule();
    const throwingMeasure = jest.fn(() => {
      throw new TypeError('measure is not supported in this form');
    });
    setPerformance({ mark, measure: throwingMeasure });

    markOnce(PERFORMANCE_MARKS.INTL_READY);
    markOnce(PERFORMANCE_MARKS.INTL_READY);

    // `alreadyMarked.add` runs after a successful `mark` and before `measure`,
    // so a failed measure must not leave the door open to a duplicate mark.
    expect(mark).toHaveBeenCalledTimes(1);
  });

  it('does not record a mark as seen when it could not be written', () => {
    const { default: markOnce, PERFORMANCE_MARKS } = loadModule();

    setPerformance({});
    markOnce(PERFORMANCE_MARKS.SHELL_CHROME_MOUNTED);

    // Once the API is available the mark must still be writable.
    setPerformance({ mark, measure });
    markOnce(PERFORMANCE_MARKS.SHELL_CHROME_MOUNTED);

    expect(mark).toHaveBeenCalledWith('mc:shell-chrome-mounted');
  });
});

describe('PERFORMANCE_MARKS', () => {
  it('holds the six canonical names from FEC-1297', () => {
    const { PERFORMANCE_MARKS } = loadModule();

    // `mc:skeleton-visible` has no emitter in this package. FEC-1298 emits it
    // by hand in `mc-html-template/html-scripts/loading-screen.js`, because
    // that file is untranspiled ES5 with no module system.
    expect(Object.values(PERFORMANCE_MARKS)).toEqual([
      'mc:skeleton-visible',
      'mc:shell-chrome-mounted',
      'mc:intl-ready',
      'mc:content-rendered',
      'mc:hydration-user',
      'mc:hydration-project',
    ]);
  });

  it('prefixes every name with `mc:` so consumers can filter on it', () => {
    const { PERFORMANCE_MARKS } = loadModule();

    Object.values(PERFORMANCE_MARKS).forEach((name) => {
      expect(name).toMatch(/^mc:/);
    });
  });
});
