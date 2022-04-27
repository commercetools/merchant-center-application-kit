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
