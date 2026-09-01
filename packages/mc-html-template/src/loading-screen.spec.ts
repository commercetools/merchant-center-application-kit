import fs from 'fs';
import path from 'path';
import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import generateTemplate from './generate-template';
import replaceHtmlPlaceholders from './replace-html-placeholders';

/**
 * Runtime harness for `html-scripts/loading-screen.js`.
 *
 * That file ships to the browser untranspiled and is inlined into the HTML by
 * `replaceHtmlPlaceholders`, so nothing imports it as a module. It is read from
 * disk (rather than through the preval'd `./load-html-scripts`) so a warm jest
 * transform cache can never serve a stale copy.
 */
const scriptSource = fs.readFileSync(
  path.join(__dirname, '../html-scripts/loading-screen.js'),
  'utf8'
);

const env = {
  applicationId: '__local:avengers',
  applicationName: 'avengers-app',
  entryPointUriPath: 'avengers',
  cdnUrl: 'http://localhost:3001/',
  env: 'test',
  frontendHost: 'localhost:3001',
  location: 'gcp-eu',
  mcApiUrl: 'https://mc-api.example.com',
  revision: '',
  servedByProxy: false,
} as unknown as ApplicationRuntimeConfig['env'];

const compiledHtml = replaceHtmlPlaceholders(generateTemplate({}), {
  env,
  headers: { 'Content-Security-Policy': "default-src 'none'" } as never,
});

// The real `#app-loader` subtree, so these tests exercise the shipped markup
// rather than a hand-written fixture.
const loaderMarkup = compiledHtml.slice(
  compiledHtml.indexOf('<div id="app-loader">'),
  compiledHtml.indexOf('<div id="app">')
);

const bootLoadingScreen = () => {
  // eslint-disable-next-line no-new-func
  new Function(scriptSource)();
};

const setUrl = (pathname: string) => window.history.pushState({}, '', pathname);

const setViewportWidth = (width: number) =>
  Object.defineProperty(window, 'innerWidth', {
    value: width,
    configurable: true,
    writable: true,
  });

const skeleton = () =>
  document.querySelector('.loading-skeleton') as HTMLElement;
const loadingScreen = () =>
  document.querySelector('.loading-screen') as HTMLElement;
const appLoader = () => document.querySelector('#app-loader');

const addPreload = (attrs: Record<string, string>) => {
  const linkEl = document.createElement('link');
  Object.keys(attrs).forEach((name) => linkEl.setAttribute(name, attrs[name]));
  document.head.appendChild(linkEl);
  return linkEl;
};

/**
 * jsdom implements neither User Timing nor Resource Timing - `performance.mark`,
 * `measure` and `getEntriesByName` are all undefined - so the surface the script
 * feature-detects has to be provided here. Without this shim the mark
 * assertions below would pass vacuously.
 */
const PERFORMANCE_METHODS = ['mark', 'measure', 'getEntriesByName'] as const;

type PerformanceShim = Record<(typeof PERFORMANCE_METHODS)[number], jest.Mock>;

let perf: PerformanceShim;

const installPerformanceShim = () => {
  perf = {
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(() => []),
  };

  PERFORMANCE_METHODS.forEach((method) => {
    Object.defineProperty(window.performance, method, {
      value: perf[method],
      configurable: true,
      writable: true,
    });
  });
};

const removePerformanceShim = () =>
  PERFORMANCE_METHODS.forEach((method) => {
    delete (window.performance as unknown as Record<string, unknown>)[method];
  });

/** Pretends the given hrefs already finished loading, per Resource Timing. */
const stubCompletedResources = (hrefs: string[]) =>
  perf.getEntriesByName.mockImplementation((name: string) =>
    hrefs.some((href) => name.indexOf(href) !== -1) ? [{ responseEnd: 12 }] : []
  );

beforeEach(() => {
  jest.useFakeTimers();
  installPerformanceShim();
  document.head.innerHTML = '';
  document.body.innerHTML = `${loaderMarkup}<div id="app"></div>`;
  window.localStorage.clear();
  setUrl('/my-project-key/orders');
  setViewportWidth(1400);
  delete (window as { onAppLoaded?: unknown }).onAppLoaded;
  (window as { __CSS_REMAINING__?: number }).__CSS_REMAINING__ = 0;
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  removePerformanceShim();
  jest.restoreAllMocks();
});

describe('session gate', () => {
  it('should reveal the skeleton immediately when a session is cached', () => {
    window.localStorage.setItem('isAuthenticated', 'true');

    bootLoadingScreen();

    // No timers advanced: the skeleton is the intended layout, so unlike the
    // bare spinner there is nothing to avoid flashing.
    expect(skeleton().classList).not.toContain('loading-skeleton--hidden');
    expect(loadingScreen().classList).toContain('loading-screen--hidden');
  });

  it('should show the spinner after 250ms when no session is cached', () => {
    bootLoadingScreen();

    expect(skeleton().classList).toContain('loading-skeleton--hidden');
    expect(loadingScreen().classList).toContain('loading-screen--hidden');

    jest.advanceTimersByTime(250);

    expect(loadingScreen().classList).not.toContain('loading-screen--hidden');
    expect(skeleton().classList).toContain('loading-skeleton--hidden');
  });

  it.each(['false', 'TRUE', '1', ''])(
    'should treat the non-canonical flag value %p as unauthenticated',
    (value) => {
      window.localStorage.setItem('isAuthenticated', value);

      bootLoadingScreen();

      expect(skeleton().classList).toContain('loading-skeleton--hidden');
    }
  );

  it('should fall back to the spinner when storage access throws', () => {
    // Set the flag first, so a pass cannot come from the key merely being absent.
    window.localStorage.setItem('isAuthenticated', 'true');

    // Replace the whole `localStorage` object rather than spying on `getItem`:
    // jsdom defines `getItem` as an own property of a proxied Storage instance,
    // so a prototype spy is shadowed and an instance spy cannot be restored -
    // and an unrestored one silently makes every later authenticated test read
    // as unauthenticated.
    const original = window.localStorage;

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem() {
          throw new Error('SecurityError: storage is disabled');
        },
      },
      configurable: true,
    });

    try {
      expect(() => bootLoadingScreen()).not.toThrow();
      expect(skeleton().classList).toContain('loading-skeleton--hidden');

      jest.advanceTimersByTime(250);

      expect(loadingScreen().classList).not.toContain('loading-screen--hidden');
    } finally {
      Object.defineProperty(window, 'localStorage', {
        value: original,
        configurable: true,
      });
    }
  });
});

describe('route gate', () => {
  beforeEach(() => window.localStorage.setItem('isAuthenticated', 'true'));

  it.each(['/account/profile', '/login', '/logout'])(
    'should suppress the sidebar on %s, where the shell renders no NavBar',
    (pathname) => {
      setUrl(pathname);

      bootLoadingScreen();

      expect(skeleton().classList).toContain('loading-skeleton--no-navbar');
      expect(skeleton().classList).not.toContain('loading-skeleton--hidden');
    }
  );

  it('should fall back to the spinner for Custom Views', () => {
    // Custom Views mount their own shell and never render the app chrome.
    setUrl('/custom-views/abc123/projects/my-project-key');

    bootLoadingScreen();

    expect(skeleton().classList).toContain('loading-skeleton--hidden');

    jest.advanceTimersByTime(250);

    expect(loadingScreen().classList).not.toContain('loading-screen--hidden');
  });

  it('should render the full skeleton inside a project route', () => {
    setUrl('/my-project-key/orders');

    bootLoadingScreen();

    expect(skeleton().classList).not.toContain('loading-skeleton--no-navbar');
    expect(skeleton().classList).not.toContain('loading-skeleton--hidden');
  });
});

describe('viewport gate', () => {
  beforeEach(() => window.localStorage.setItem('isAuthenticated', 'true'));

  it('should expand the sidebar when the menu is pinned on a wide viewport', () => {
    window.localStorage.setItem('isForcedMenuOpen', 'true');
    setViewportWidth(1400);

    bootLoadingScreen();

    expect(skeleton().classList).toContain('loading-skeleton--menu-expanded');
  });

  it('should stay collapsed when the menu is pinned at or below 1200px', () => {
    // useNavbarStateManager resets isMenuOpen to false below WINDOW_SIZES.WIDE
    // regardless of the flag, so honouring the flag alone would jump 176px.
    window.localStorage.setItem('isForcedMenuOpen', 'true');
    setViewportWidth(1100);

    bootLoadingScreen();

    expect(skeleton().classList).not.toContain(
      'loading-skeleton--menu-expanded'
    );
  });

  it('should stay collapsed when the menu is not pinned', () => {
    setViewportWidth(1400);

    bootLoadingScreen();

    expect(skeleton().classList).not.toContain(
      'loading-skeleton--menu-expanded'
    );
  });
});

describe('mc:skeleton-visible mark', () => {
  it('should emit the mark on the authenticated path', () => {
    window.localStorage.setItem('isAuthenticated', 'true');

    bootLoadingScreen();

    expect(perf.mark).toHaveBeenCalledWith('mc:skeleton-visible');
    // Measured from the time origin, i.e. navigationStart.
    expect(perf.measure).toHaveBeenCalledWith('mc:skeleton-visible', {
      start: 0,
    });
  });

  it('should not emit the mark on the spinner path', () => {
    bootLoadingScreen();
    jest.advanceTimersByTime(250);

    expect(perf.mark).not.toHaveBeenCalled();
  });

  it('should still upgrade stylesheets when instrumentation throws', () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    perf.mark.mockImplementation(() => {
      throw new Error('performance is unavailable');
    });
    const linkEl = addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.example.com/app-shell.css',
      'data-mc-css': '',
    });
    stubCompletedResources(['app-shell.css']);

    expect(() => bootLoadingScreen()).not.toThrow();

    expect(linkEl.rel).toBe('stylesheet');
  });
});

describe('missing User Timing API', () => {
  it('should still reveal the skeleton when performance is unavailable', () => {
    // The actual jsdom default, and a real possibility in older browsers.
    removePerformanceShim();
    window.localStorage.setItem('isAuthenticated', 'true');

    expect(() => bootLoadingScreen()).not.toThrow();

    expect(skeleton().classList).not.toContain('loading-skeleton--hidden');
  });
});

describe('long-loading notice', () => {
  const noticeIn = (root: HTMLElement) =>
    root.querySelector('.long-loading-notice') as HTMLElement;

  it('should reveal only the skeleton notice on the authenticated path', () => {
    window.localStorage.setItem('isAuthenticated', 'true');

    bootLoadingScreen();
    jest.advanceTimersByTime(2000);

    expect(noticeIn(skeleton()).classList).not.toContain(
      'long-loading-notice--hidden'
    );
    expect(noticeIn(loadingScreen()).classList).toContain(
      'long-loading-notice--hidden'
    );
  });

  it('should reveal only the spinner notice on the unauthenticated path', () => {
    bootLoadingScreen();
    jest.advanceTimersByTime(2000);

    expect(noticeIn(loadingScreen()).classList).not.toContain(
      'long-loading-notice--hidden'
    );
    expect(noticeIn(skeleton()).classList).toContain(
      'long-loading-notice--hidden'
    );
  });
});

describe('stylesheet preload upgrade', () => {
  it('should upgrade a preload once it loads', () => {
    const linkEl = addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://fonts.example.com/open-sans.css',
    });

    bootLoadingScreen();
    expect(linkEl.rel).toBe('preload');

    linkEl.dispatchEvent(new Event('load'));

    expect(linkEl.rel).toBe('stylesheet');
  });

  it('should upgrade a preload that already completed before the script ran', () => {
    // The common case, not an edge case: this script is parser-inserted and
    // deferred behind the still-blocking Inter stylesheet, so same-origin
    // preloads have usually already fired `load` by the time it runs.
    const linkEl = addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.example.com/app-shell.css',
      'data-mc-css': '',
    });
    stubCompletedResources(['app-shell.css']);

    bootLoadingScreen();

    expect(linkEl.rel).toBe('stylesheet');
    expect((window as { __CSS_REMAINING__?: number }).__CSS_REMAINING__).toBe(
      0
    );
  });

  it('should upgrade at most once, so the counter cannot double-decrement', () => {
    const linkEl = addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.example.com/app-shell.css',
      'data-mc-css': '',
    });

    bootLoadingScreen();
    linkEl.dispatchEvent(new Event('load'));
    linkEl.dispatchEvent(new Event('load'));

    expect(linkEl.getAttribute('data-mc-upgraded')).toBe('');
    expect((window as { __CSS_REMAINING__?: number }).__CSS_REMAINING__).toBe(
      0
    );
  });

  it('should release the counter when a stylesheet errors', () => {
    const linkEl = addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.example.com/app-shell.css',
      'data-mc-css': '',
    });

    bootLoadingScreen();
    linkEl.dispatchEvent(new Event('error'));

    expect((window as { __CSS_REMAINING__?: number }).__CSS_REMAINING__).toBe(
      0
    );
  });

  it.each([
    [
      'as="fetch" prefetch hints (FEC-1301)',
      { as: 'fetch', href: '/__prefetch/user' },
    ],
    ['modulepreload tags', { as: '', href: '/assets/chunk.js' }],
  ])('should not touch %s', (_label, attrs) => {
    const linkEl = addPreload({
      rel: attrs.as === 'fetch' ? 'preload' : 'modulepreload',
      ...(attrs.as ? { as: attrs.as } : {}),
      href: attrs.href,
    });

    bootLoadingScreen();
    linkEl.dispatchEvent(new Event('load'));

    expect(linkEl.rel).not.toBe('stylesheet');
    expect(linkEl.getAttribute('data-mc-upgraded')).toBeNull();
  });
});

describe('onAppLoaded reveal gate', () => {
  it('should remove the loader immediately when no app CSS is pending', () => {
    bootLoadingScreen();

    window.onAppLoaded();

    expect(appLoader()).toBeNull();
  });

  it('should wait for every pending app stylesheet, not just the first', () => {
    const first = addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.example.com/app-shell.css',
      'data-mc-css': '',
    });
    const second = addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.example.com/index.css',
      'data-mc-css': '',
    });

    bootLoadingScreen();
    window.onAppLoaded();

    expect(appLoader()).not.toBeNull();

    first.dispatchEvent(new Event('load'));
    expect(appLoader()).not.toBeNull();

    second.dispatchEvent(new Event('load'));
    expect(appLoader()).toBeNull();
  });

  it('should not wait on fonts, which use display=swap', () => {
    addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://fonts.example.com/open-sans.css',
    });

    bootLoadingScreen();
    window.onAppLoaded();

    expect(appLoader()).toBeNull();
  });

  it('should reveal the app anyway when a stylesheet never resolves', () => {
    // Before this gate existed onAppLoaded removed the loader unconditionally,
    // so an unbounded wait would be a new availability regression: degrade to
    // visible-but-unstyled, never invisible.
    addPreload({
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.example.com/never-resolves.css',
      'data-mc-css': '',
    });

    bootLoadingScreen();
    window.onAppLoaded();

    expect(appLoader()).not.toBeNull();

    jest.advanceTimersByTime(2000);

    expect(appLoader()).toBeNull();
  });
});
