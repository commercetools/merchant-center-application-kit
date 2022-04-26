---
'@commercetools-frontend/codemod': minor
---

Add new Codemod package. The first transform is `rename-js-to-jsx`, which helps renaming JS files using React (JSX) to `.jsx` extension.

```
npx @commercetools-frontend/codemod rename-js-to-jsx 'src/**/*.js'
```
