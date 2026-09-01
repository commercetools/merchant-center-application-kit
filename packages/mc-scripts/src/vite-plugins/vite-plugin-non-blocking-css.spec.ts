import type { Plugin } from 'vite';
import pluginNonBlockingCss from './vite-plugin-non-blocking-css';

/**
 * Invokes the `transformIndexHtml` hook. The cast is needed because Vite types
 * the hook's `this` as PluginContext, which this implementation does not use,
 * and because only the two context fields below are relevant here.
 */
const transform = (plugin: Plugin, html: string, isBuild: boolean) => {
  const hook = plugin.transformIndexHtml;

  if (typeof hook !== 'function') {
    throw new Error('transformIndexHtml is not a function');
  }

  return (hook as (html: string, ctx: { bundle?: unknown }) => string)(html, {
    bundle: isBuild ? {} : undefined,
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
        true
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

  describe('dev server', () => {
    it('should return the html unmodified when there is no bundle', () => {
      const html = '<link rel="stylesheet" href="app-shell.css">';

      expect(transform(pluginNonBlockingCss(), html, false)).toBe(html);
    });
  });
});
