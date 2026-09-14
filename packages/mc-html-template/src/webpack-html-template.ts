import type { TemplateParameter } from 'html-webpack-plugin';
// Keep it a direct import, otherwise Webpack will try to require/load
// non-browser dependencies.
import generateTemplate from './generate-template';

function webpackHtmlTemplate(templateParams: TemplateParameter) {
  const cssVendorChunks: string[] = [];
  const cssAppChunks: string[] = [];

  templateParams.htmlWebpackPlugin.files.css.forEach((file) => {
    if (file.indexOf('vendor') === -1) {
      cssAppChunks.push(file);
    } else {
      cssVendorChunks.push(file);
    }
  });
  const cssChunks = cssVendorChunks
    .concat(cssAppChunks)
    .map((fileName) => fileName.replace(/^\//, ''));

  const scriptChunks = templateParams.htmlWebpackPlugin.files.js.map(
    (fileName) =>
      // Trim leading slash, the CDN_URL will ensure to have a trailing slash
      // (see `replaceHtmlPlaceholders`)
      fileName.replace(/^\//, '')
  );

  // Non-blocking preloads rather than stylesheets, so app CSS doesn't block
  // first paint. `loading-screen.js` upgrades each one to `rel="stylesheet"`
  // once loaded and gates `window.onAppLoaded()` on the `data-mc-css` ones.
  const cssImports = cssChunks.map(
    (chunkPath) =>
      `<link rel="preload" as="style" data-mc-css href="__CDN_URL__${chunkPath}">`
  );
  const scriptImports = scriptChunks.map(
    (chunkPath) => `<script src="__CDN_URL__${chunkPath}" defer></script>`
  );

  return generateTemplate({ cssImports, scriptImports });
}

export default webpackHtmlTemplate;
