import type { Plugin } from 'vite';

/**
 * Matches the stylesheet `<link>` tags Vite injects into the built HTML.
 *
 * Deliberately narrow:
 * - only `rel="stylesheet"`, so `rel="modulepreload"` (which Vite also emits)
 *   and `rel="icon"` / `rel="preconnect"` are left alone
 * - the `rel` may appear before or after `href`, since tag attribute order is
 *   not part of Vite's contract
 */
const STYLESHEET_LINK_RE = /<link\b[^>]*\brel="stylesheet"[^>]*>/g;
const REL_STYLESHEET_RE = /\brel="stylesheet"/;

/**
 * Rewrites Vite's render-blocking stylesheet `<link>` tags into non-blocking
 * preloads, marked with `data-mc-css`.
 *
 * `html-scripts/loading-screen.js` in `@commercetools-frontend/mc-html-template`
 * upgrades them back to `rel="stylesheet"` once they have loaded, and gates
 * `window.onAppLoaded()` on the `data-mc-css` ones so the app is never revealed
 * unstyled. The upgrade lives in that inline script rather than in an
 * `onload` handler attribute because the production CSP allows neither
 * `'unsafe-inline'` nor `'unsafe-hashes'` in `script-src`, and script hashes do
 * not cover event-handler attributes.
 *
 * NOTE: this only affects the Vite build. The default webpack build emits its
 * CSS links from `mc-html-template`'s `webpack-html-template.ts` and is
 * unchanged (see FEC-1298's follow-up work).
 */
function pluginNonBlockingCss(): Plugin {
  return {
    name: 'vite-plugin-non-blocking-css',
    apply: 'build',
    // No `enforce`: this must run after Vite's own `vite:build-html`, which
    // injects the stylesheet tags during `generateBundle` and only then applies
    // the normal- and post-order `transformIndexHtml` hooks.
    transformIndexHtml(html, ctx) {
      // `ctx.bundle` is only set for the build, not the dev server.
      if (!ctx.bundle) {
        return html;
      }

      return html.replace(STYLESHEET_LINK_RE, (tag) =>
        tag.replace(REL_STYLESHEET_RE, 'rel="preload" as="style" data-mc-css')
      );
    },
  };
}

export default pluginNonBlockingCss;
