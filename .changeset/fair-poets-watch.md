---
'@commercetools-frontend/mc-dev-authentication': minor
'@commercetools-frontend/mc-html-template': minor
'@commercetools-frontend/mc-scripts': minor
---

Enable opt-in support for using [Vite.js](https://vitejs.dev/) bundler. To enable it, set the environment variable `ENABLE_EXPERIMENTAL_VITE_BUNDLER="true"` in your dotenv file.

# Why Vite

Vite (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects.

You can learn more about the rationale behind the project in the [Why Vite](https://vitejs.dev/guide/why.html) documentation.

# Native ES Modules support

Vite is optimized for using native [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) via `<script type="module">` tags and ES Modules dynamic import.

# CLI compatibility

All the `mc-scripts` CLI commands are fully compatible with the new bundler, so you can continue using them as before.

## Unsupported features

The `cdnUrl` value is not supported at the moment when using Vite.

# Required file extensions

Vite relies on the file extensions to determine how to process the file in the best possible way. For example, a file using JSX should use the extension `.jsx`, or `.tsx` for TypeScript.

Up until now we didn't enforce this with Webpack, so using `.js` or `.jsx` works in both cases. If you are still using `.js` for files including the JSX syntax, you need to rename the file to `.jsx`.

To help with the renaming, you can use our codemod `rename-js-to-jsx`:

```
npx @commercetools-frontend/codemod rename-js-to-jsx 'src/**/*.js'
```
