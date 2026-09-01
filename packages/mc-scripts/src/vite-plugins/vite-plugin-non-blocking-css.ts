import type { Plugin } from 'vite';

/**
 * Matches any stylesheet `<link>` tag. This is only a candidate filter -- which
 * candidates are actually rewritten is decided by matching the tag's `href`
 * against the CSS assets Vite really emitted (see `transformIndexHtml`).
 *
 * That second check is load-bearing, not defensive. The built HTML also carries
 * stylesheet links this plugin must never touch:
 * - the Inter/Nimbus font link, which NimbusProvider renders identically and
 *   React 19 dedupes by matching `link[rel="stylesheet"][href]`; rewriting it
 *   makes Nimbus inject its own blocking stylesheet at mount instead
 * - the `<noscript>` Open Sans fallback, which is inert as a preload
 * Both would also wrongly gain `data-mc-css` and start gating app reveal on a
 * third-party request.
 */
const STYLESHEET_LINK_RE = /<link\b[^>]*\brel="stylesheet"[^>]*>/g;
const REL_STYLESHEET_RE = /\brel="stylesheet"/;
const HREF_RE = /\bhref="([^"]*)"/;

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

      // Only rewrite links pointing at CSS this build actually emitted. Anything
      // else in the template -- fonts, the noscript fallback, icons -- is left
      // exactly as authored.
      const emittedCssFileNames = Object.keys(ctx.bundle).filter((fileName) =>
        fileName.endsWith('.css')
      );

      if (emittedCssFileNames.length === 0) {
        return html;
      }

      return html.replace(STYLESHEET_LINK_RE, (tag) => {
        const href = HREF_RE.exec(tag)?.[1];

        // `endsWith` rather than equality: hrefs may carry the `__CDN_URL__`
        // placeholder prefix from `experimental.renderBuiltUrl`.
        const isEmittedCss = href
          ? emittedCssFileNames.some((fileName) => href.endsWith(fileName))
          : false;

        return isEmittedCss
          ? tag.replace(
              REL_STYLESHEET_RE,
              'rel="preload" as="style" data-mc-css'
            )
          : tag;
      });
    },
  };
}

export default pluginNonBlockingCss;
