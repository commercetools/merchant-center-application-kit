---
'@commercetools-frontend/mc-scripts': patch
---

Updated the [vite-plugin-react-swc](vite-plugin-react-swc) `vite` plugin (we use it to run applications locally) configuration to use the `@emotion/react` `jsx` import instead of the `react` [default one](https://github.com/vitejs/vite-plugin-react-swc?tab=readme-ov-file#jsximportsource) as we use `emotion` is some of our consumer applications.
