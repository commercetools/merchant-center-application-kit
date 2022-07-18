import type { Plugin } from 'vite';

// This script/function is injected into the `index.html` and used by Vite
// on runtime to build the assets URL (for example when using a separate CDN for the assets).
// Inspired by https://github.com/vitejs/vite/blob/main/playground/assets/vite.config-runtime-base.js
const dynamicBaseAssetsCode = `globalThis.__toCdnUrl = filePath => window.app.cdnUrl.replace(/\\/$/, '') + '/' + filePath;`;

function vitePluginDynamicBaseAssetsGlobals(): Plugin {
  return {
    name: 'dynamic-base-assets-globals',
    transformIndexHtml(html, ctx) {
      if (ctx.bundle) {
        // Only inject during build
        return [
          {
            tag: 'script',
            attrs: { type: 'module' },
            children: dynamicBaseAssetsCode,
          },
        ];
      }
      return html;
    },
  };
}

export default vitePluginDynamicBaseAssetsGlobals;
