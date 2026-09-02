import type { Plugin } from 'vite';
import {
  generateTemplate,
  replaceHtmlPlaceholders,
} from '@commercetools-frontend/mc-html-template';
import pluginNonBlockingCss from './vite-plugin-non-blocking-css';

/**
 * Invokes the `transformIndexHtml` hook. The cast is needed because Vite types
 * the hook's `this` as PluginContext, which this implementation does not use,
 * and because only the two context fields below are relevant here.
 *
 * `emittedCss` stands in for the CSS assets Vite put in the output bundle; the
 * plugin only rewrites links whose href matches one of them.
 */
const transform = (
  plugin: Plugin,
  html: string,
  isBuild: boolean,
  emittedCss: string[] = ['app-shell.css', 'index.css']
) => {
  const hook = plugin.transformIndexHtml;

  if (typeof hook !== 'function') {
    throw new Error('transformIndexHtml is not a function');
  }

  const bundle = emittedCss.reduce<Record<string, unknown>>(
    (acc, fileName) => Object.assign(acc, { [fileName]: { fileName } }),
    { 'index.js': { fileName: 'index.js' } }
  );

  return (hook as (html: string, ctx: { bundle?: unknown }) => string)(html, {
    bundle: isBuild ? bundle : undefined,
  });
};

describe('vite-plugin-non-blocking-css', () => {
  describe('plugin structure', () => {
    it('should be a build-only plugin with a transformIndexHtml hook', () => {
      const plugin = pluginNonBlockingCss();

      expect(plugin.name).toBe('vite-plugin-non-blocking-css');
      expect(plugin.apply).toBe('build');
      expect(plugin.transformIndexHtml).toBeDefined();
    });

    it('should not set `enforce`, so it runs after vite:build-html', () => {
      // Vite injects the stylesheet tags during `generateBundle` and only then
      // applies normal- and post-order hooks. `enforce: 'pre'` would run before
      // the tags exist and this plugin would be a no-op.
      expect(pluginNonBlockingCss().enforce).toBeUndefined();
    });
  });

  describe('rewriting stylesheet links', () => {
    it('should rewrite a stylesheet link into a marked preload', () => {
      const result = transform(
        pluginNonBlockingCss(),
        '<link rel="stylesheet" crossorigin href="app-shell.css">',
        true
      );

      expect(result).toBe(
        '<link rel="preload" as="style" data-mc-css crossorigin href="app-shell.css">'
      );
    });

    it('should preserve the crossorigin attribute Vite emitted', () => {
      const result = transform(
        pluginNonBlockingCss(),
        '<link rel="stylesheet" crossorigin href="index.css">',
        true
      );

      expect(result).toContain('crossorigin');
    });

    it('should rewrite every stylesheet link', () => {
      const result = transform(
        pluginNonBlockingCss(),
        '<link rel="stylesheet" href="app-shell.css">' +
          '<link rel="stylesheet" href="index.css">',
        true
      );

      expect(
        result.match(/rel="preload" as="style" data-mc-css/g)
      ).toHaveLength(2);
      expect(result).not.toContain('rel="stylesheet"');
    });

    it('should preserve a __CDN_URL__-prefixed href', () => {
      const result = transform(
        pluginNonBlockingCss(),
        '<link rel="stylesheet" href="__CDN_URL__app-shell.a1b2c3.css">',
        true,
        ['app-shell.a1b2c3.css']
      );

      expect(result).toContain('href="__CDN_URL__app-shell.a1b2c3.css"');
    });

    it('should rewrite a link whose rel follows its href', () => {
      const result = transform(
        pluginNonBlockingCss(),
        '<link href="app-shell.css" rel="stylesheet">',
        true
      );

      expect(result).toBe(
        '<link href="app-shell.css" rel="preload" as="style" data-mc-css>'
      );
    });
  });

  describe('links it must not touch', () => {
    it('should leave rel="modulepreload" alone', () => {
      // Vite emits these already, and FEC-1303 tunes them. Rewriting one into a
      // stylesheet would break module loading.
      const html = '<link rel="modulepreload" crossorigin href="chunk.js">';

      expect(transform(pluginNonBlockingCss(), html, true)).toBe(html);
    });

    it('should leave rel="preload" as="fetch" alone', () => {
      // FEC-1301's proxy prefetch hints share this document.
      const html =
        '<link rel="preload" href="/__prefetch/user" as="fetch" crossorigin>';

      expect(transform(pluginNonBlockingCss(), html, true)).toBe(html);
    });

    it('should leave icon and preconnect links alone', () => {
      const html =
        '<link rel="shortcut icon" type="image/png" href="favicon.png">' +
        '<link rel="preconnect" href="https://fonts.googleapis.com">';

      expect(transform(pluginNonBlockingCss(), html, true)).toBe(html);
    });
  });

  describe('links it must not touch: real template output', () => {
    // The regression these tests exist for: the plugin used to rewrite every
    // rel="stylesheet" tag in the document, which on a real build also hit the
    // Inter/Nimbus font link and the <noscript> fallback. Both then wrongly
    // gained data-mc-css and started gating app reveal on Google Fonts.
    const buildRealTemplateHtml = () =>
      replaceHtmlPlaceholders(
        generateTemplate({
          cssImports: ['<link rel="stylesheet" href="app-shell.css">'],
        }),
        {
          env: {
            applicationName: 'harness',
            entryPointUriPath: 'harness',
            cdnUrl: 'http://localhost:3001/',
            env: 'test',
            frontendHost: 'localhost:3001',
            location: 'gcp-eu',
            mcApiUrl: 'https://mc-api.example.com',
            revision: '',
            servedByProxy: false,
          } as never,
          headers: { 'Content-Security-Policy': "default-src 'none'" } as never,
        }
      );

    it('should leave the Inter/Nimbus font link untouched and unmarked', () => {
      const result = transform(
        pluginNonBlockingCss(),
        buildRealTemplateHtml(),
        true,
        ['app-shell.css']
      );
      // Scoped to the Inter tag alone: a wider window would swallow the
      // adjacent app stylesheet, which is legitimately marked.
      const interTag = result
        .split('<link')
        .find((tag) => tag.includes('family=Inter')) as string;

      expect(interTag).toBeDefined();
      // Inter is a preload in the template now, but it is a FONT: the plugin
      // must not claim it as app CSS or it would gate app reveal on Google.
      expect(interTag).toContain('data-nimbus-fonts=""');
      expect(interTag).not.toContain('data-mc-css');
    });

    it('should leave the noscript Open Sans fallback a real stylesheet', () => {
      const result = transform(
        pluginNonBlockingCss(),
        buildRealTemplateHtml(),
        true,
        ['app-shell.css']
      );
      const noscript = result.slice(
        result.indexOf('<noscript>'),
        result.indexOf('</noscript>')
      );

      expect(noscript).toContain('rel="stylesheet"');
      expect(noscript).not.toContain('data-mc-css');
    });

    it('should never mark a fonts.googleapis.com href as app CSS', () => {
      const result = transform(
        pluginNonBlockingCss(),
        buildRealTemplateHtml(),
        true,
        ['app-shell.css']
      );

      result
        .split('<link')
        .filter((tag) => tag.includes('data-mc-css'))
        .forEach((tag) => expect(tag).not.toContain('fonts.googleapis.com'));
    });

    it('should still rewrite the emitted app stylesheet in the same document', () => {
      const result = transform(
        pluginNonBlockingCss(),
        buildRealTemplateHtml(),
        true,
        ['app-shell.css']
      );

      expect(result).toContain('as="style" data-mc-css');
    });

    it('should rewrite nothing when the bundle emitted no CSS', () => {
      const html = '<link rel="stylesheet" href="app-shell.css">';

      expect(transform(pluginNonBlockingCss(), html, true, [])).toBe(html);
    });
  });

  describe('dev server', () => {
    it('should return the html unmodified when there is no bundle', () => {
      const html = '<link rel="stylesheet" href="app-shell.css">';

      expect(transform(pluginNonBlockingCss(), html, false)).toBe(html);
    });
  });
});
