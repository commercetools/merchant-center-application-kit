import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import generateTemplate from './generate-template';
import replaceHtmlPlaceholders from './replace-html-placeholders';

const env = {
  applicationId: '__local:avengers',
  applicationIdentifier: '__local:avengers',
  applicationName: 'avengers-app',
  entryPointUriPath: 'avengers',
  cdnUrl: 'http://localhost:3001/',
  env: 'test',
  frontendHost: 'localhost:3001',
  location: 'gcp-eu',
  mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
  revision: '',
  servedByProxy: false,
} as unknown as ApplicationRuntimeConfig['env'];

const compile = () =>
  replaceHtmlPlaceholders(generateTemplate({}), {
    env,
    headers: { 'Content-Security-Policy': "default-src 'none'" } as never,
  });

// The skeleton lives between `#app-loader`'s opening tag and the untouched
// `.loading-screen` sibling. Anchored on stable substrings rather than whole
// tags, since prettier wraps multi-attribute tags across lines.
const getSkeletonMarkup = (html: string) => {
  const start = html.indexOf('id="app-loader"');
  const end = html.indexOf('class="loading-screen loading-screen--hidden"');

  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);

  return html.slice(start, end);
};

describe('replaceHtmlPlaceholders', () => {
  describe('loading skeleton markup', () => {
    it('should render the skeleton with sidebar, header and content regions', () => {
      const skeleton = getSkeletonMarkup(compile());

      expect(skeleton).toContain('loading-skeleton__sidebar');
      expect(skeleton).toContain('loading-skeleton__header');
      expect(skeleton).toContain('loading-skeleton__content');
    });

    it('should keep the skeleton hidden until the script reveals it', () => {
      expect(compile()).toContain(
        'class="loading-skeleton loading-skeleton--hidden"'
      );
    });

    it('should mirror the real NavBarSkeleton item structure', () => {
      const sidebar = getSkeletonMarkup(compile());
      // One icon per item; counting the item class itself would double-count,
      // since each item also carries a `--wide`/`--narrow` modifier.
      const items = sidebar.match(/loading-skeleton__icon/g) ?? [];

      // 1 narrow header item, then body groups of 2, 10 and 1.
      expect(items).toHaveLength(14);
      expect(sidebar.match(/loading-skeleton__group/g)).toHaveLength(3);
      expect(sidebar).toContain('loading-skeleton__expander');
    });

    it('should carry accessible loading semantics', () => {
      const skeleton = getSkeletonMarkup(compile());

      expect(skeleton).toContain('aria-busy="true"');
      expect(skeleton).toContain('role="status"');
      expect(skeleton).toContain('Loading Merchant Center');
      // Decorative chrome must not be announced.
      expect(skeleton).toContain('aria-hidden="true"');
    });

    it('should render a long-loading notice in both variants', () => {
      const html = compile();

      expect(
        html.match(/long-loading-notice long-loading-notice--hidden/g)
      ).toHaveLength(2);
    });

    it('should preserve the unauthenticated spinner and wordmark', () => {
      const html = compile();

      expect(html).toContain('class="loading-screen loading-screen--hidden"');
      expect(html).toContain('loading-spinner-pointer');
    });
  });

  describe('render-blocking resources', () => {
    it('should preload Open Sans instead of linking it as a stylesheet', () => {
      const html = compile();

      // Attribute order and line wrapping are prettier's, so assert on the
      // attributes present in the tag rather than an exact one-line shape.
      // Anchored on the family so the assertion keeps pointing at Open Sans
      // once other rel="preload" links exist earlier in the document.
      const tag = html
        .split('<link')
        .find(
          (candidate) =>
            candidate.includes('family=Open+Sans') &&
            candidate.includes('rel="preload"')
        ) as string;

      expect(tag).toBeDefined();

      expect(tag).toContain('rel="preload"');
      expect(tag).toContain('as="style"');
      expect(tag).toMatch(/family=Open\+Sans/);
    });

    it('should provide a noscript stylesheet fallback for Open Sans', () => {
      const html = compile();
      const noscript = html.slice(
        html.indexOf('<noscript>'),
        html.indexOf('</noscript>')
      );

      expect(noscript).toMatch(/family=Open\+Sans/);
      expect(noscript).toContain('rel="stylesheet"');
    });

    it('should leave the Inter/Nimbus link blocking and fully attributed', () => {
      // NimbusProvider renders a byte-identical link and React 19 dedupes by
      // matching link[rel="stylesheet"][href]. Converting this would make Nimbus
      // inject its own blocking stylesheet at mount instead.
      const html = compile();
      const interLink = html.slice(
        html.indexOf(
          '<link\n      href="https://fonts.googleapis.com/css2?family=Inter'
        ),
        html.indexOf('__APPLICATION_CSS_IMPORTS__')
      );

      expect(interLink).toContain('rel="stylesheet"');
      expect(interLink).toContain('data-nimbus-fonts=""');
      expect(interLink).toContain('precedence="default"');
    });

    it('should not use an inline onload handler anywhere', () => {
      // The production CSP allows neither 'unsafe-inline' nor 'unsafe-hashes' in
      // script-src, and script hashes do not cover event-handler attributes.
      expect(compile()).not.toContain('onload=');
    });
  });

  describe('first-paint self-sufficiency', () => {
    it('should reset the body margin itself, since app CSS is now a preload', () => {
      // resets.css used to supply this render-blocking; a 100vw/100vh skeleton
      // inside the UA default margin would overflow and shift.
      const html = compile();

      expect(html).toMatch(/html,\s*body\s*\{[^}]*margin:\s*0/);
    });
  });

  describe('view transitions', () => {
    it('should inject the loading screen styles outside #app-loader', () => {
      // `onAppLoaded()` removes #app-loader, and the @view-transition opt-in must
      // still be in the document when the user navigates away.
      const html = compile();

      expect(html.indexOf('<style>')).toBeLessThan(
        html.indexOf('<div id="app-loader">')
      );
    });

    it('should opt the document in to cross-document view transitions', () => {
      expect(compile()).toContain('@view-transition');
    });

    it('should neutralise the animation under reduced motion, not the transition', () => {
      const html = compile();

      expect(html).toContain('prefers-reduced-motion: reduce');
      expect(html).toContain('animation-duration');
      expect(html).not.toContain('navigation: none');
    });
  });

  describe('layout constants (drift alarm)', () => {
    // These literals are duplicated from packages/application-shell/src/constants.ts
    // (DIMENSIONS.header, NAVBAR.widthLeftNavigation*) and the UI Kit's
    // --color-primary-10. This test pins the values currently baked into
    // loading-screen.css against an accidental edit HERE; it canNOT detect a
    // change to constants.ts, because mc-html-template has no import path to
    // application-shell and this CSS is inlined before any JS module loads.
    // Cross-package drift remains a manual three-way responsibility, shared with
    // navbar-skeleton.styles.tsx which also hardcodes these widths.
    it.each([
      ['header height', '56px'],
      ['navbar collapsed width', '80px'],
      ['navbar expanded width', '256px'],
      ['navbar background', 'hsl(240, 66%, 19%)'],
    ])('should pin the %s to %s', (_label, value) => {
      expect(compile()).toContain(value);
    });
  });
});
