import type { Plugin } from 'vite';

/**
 * Only a candidate filter: which links are actually rewritten is decided by
 * matching `href` against the CSS assets Vite really emitted (see
 * `transformIndexHtml`). That check matters, because the built HTML also
 * carries stylesheet links this plugin must never touch -- the Inter/Nimbus
 * font link and the `<noscript>` Open Sans fallback -- which would otherwise
 * gain `data-mc-css` and start gating app reveal on a third-party request.
 */
const STYLESHEET_LINK_RE = /<link\b[^>]*\brel="stylesheet"[^>]*>/g;
const REL_STYLESHEET_RE = /\brel="stylesheet"/;
const HREF_RE = /\bhref="([^"]*)"/;

/**
 * Rewrites Vite's render-blocking stylesheet links into preloads marked
 * `data-mc-css`. `loading-screen.js` upgrades them back once loaded and gates
 * `window.onAppLoaded()` on them so the app is never revealed unstyled.
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
