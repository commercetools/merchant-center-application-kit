---
'@commercetools-frontend/codemod': minor
---

Introduces a new codemod which helps migrating away from React's `defaultProps` to `prop` destructuring.

This is how the change looks like:

```ts
// BEFORE
type TMyComponentProps = {
  message: string;
  size: string;
}

function MyComponent(props: TMyComponentProps) {
 ...
}

MyComponent.defaultProps = {
  size: 'big'
}


// AFTER
type TMyComponentProps = {
  message: string;
  size?: string; // <--- Note this property is now defined as optional
}

function MyComponent({ size = 'big', ...props }: TMyComponentProps) {
 ...
}
```

And here is how the new codemod can be run:

```
$ npx @commercetools-frontend/codemod@latest react-default-props-migration 'src/**/*.{jsx,tsx}'
```
