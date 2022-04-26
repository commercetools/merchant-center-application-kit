# @commercetools-frontend/codemod

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/codemod"><img src="https://badgen.net/npm/v/@commercetools-frontend/codemod" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/codemod"><img src="https://badgen.net/npm/v/@commercetools-frontend/codemod/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/codemod"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/codemod" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Codemod transformations for Custom Applications.

## Usage

```bash
$ npx @commercetools-frontend/codemod <transform> <glob_pattern>
```

## Transforms

### `rename-js-to-jsx`

Rename `.js` files using React JSX syntax to `.jsx`.

```
$ npx @commercetools-frontend/codemod rename-js-to-jsx 'src/**/*.js'
```
