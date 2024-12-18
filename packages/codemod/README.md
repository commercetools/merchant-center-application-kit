# @commercetools-frontend/codemod

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/codemod"><img src="https://badgen.net/npm/v/@commercetools-frontend/codemod" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/codemod"><img src="https://badgen.net/npm/v/@commercetools-frontend/codemod/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/codemod"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/codemod" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Codemod transformations for Custom Applications.

## Usage

```bash
$ npx @commercetools-frontend/codemod@latest <transform> <glob_pattern>
```

We recommend to run `prettier` on the modified files to preserve the formatting configured on your project. For example, you can run `prettier --write $(git diff --name-only)`.

> If you are using `lint-staged` there is a high chance that you already run `prettier` on the staged files. Therefore, you don't need to run it manually.

## Transforms

### `remove-deprecated-modal-level-props`

Remove deprecated `level` and `baseZIndex` props from modal page components.

```
$ npx @commercetools-frontend/codemod@latest remove-deprecated-modal-level-props 'src/**/*.{js,jsx,ts,tsx}'
```

### `rename-js-to-jsx`

Rename `.js` files using React JSX syntax to `.jsx`.

```
$ npx @commercetools-frontend/codemod@latest rename-js-to-jsx 'src/**/*.js'
```

### `rename-mod-css-to-module-css`

Rename `.mod.css` files to `.module.css` and update imports.

```
$ npx @commercetools-frontend/codemod@latest rename-mod-css-to-module-css 'src/**/*.{js,jsx,ts,tsx}'
```

### `redesign-cleanup`

Remove code related to the old design when using the `useTheme` hook, for example the usage of `themedValue`.

```
$ npx @commercetools-frontend/codemod@latest redesign-cleanup 'src/**/*.{jsx,tsx}'
```

### `react-default-props-migration`

Migrates the way React Components `defaultProps` to use JavaScript default parameters instead. This is needed for React v18 or later.
Example:

```jsx
// BEFORE
function MyComponent(props) {
  return (
    <ul>
    <li>Prop 1: {props.prop1}</li>
    <li>Prop 2: {props.prop2}</li>
    <li>Prop 3: {props.prop3}</li>
  </ul>
  );
}
MyComponent.defaultProps = {
  prop1: 'My default value',
};

// AFTER
function MyComponent({ prop1: 'My default value', ...props }) {
  return (
    <ul>
    <li>Prop 1: {prop1}</li>
    <li>Prop 2: {props.prop2}</li>
    <li>Prop 3: {props.prop3}</li>
  </ul>
  );
}
```

You can run this codemod by using the following command:

```
$ npx @commercetools-frontend/codemod@latest react-default-props-migration 'src/**/*.{jsx,tsx}'
```
