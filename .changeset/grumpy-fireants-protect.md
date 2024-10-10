---
'@commercetools-frontend/mc-scripts': minor
---

We're introducing a change the way `build` command works in terms of bundles generation.
We've updated the configuration in order to reduce the size of the application's entry point bundle in favor of three four smaller bundles (which can be downloaded in parallel by the browser).

This change has been applied to the build process no matter if you use `webpack` or `vite`.
Remember `webpack` is used by default and you can opt-in to `vite` by using this environment variable:

```bash
ENABLE_EXPERIMENTAL_VITE_BUNDLER=true
```

Also, if you are using `vite`, we've also added a couple of plugins you can use to analyze the built bundle sizes:

- [vite-bundle-analyzer](https://github.com/KusStar/vite-bundle-visualizer)
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) (tree visualization)

You can use them by setting this environment variables"

```bash
# vite-bundle-analyzer
ANALYZE_BUNDLE=true
# rollup-plugin-visualizer
ANALYZE_BUNDLE_TREE=true
```
