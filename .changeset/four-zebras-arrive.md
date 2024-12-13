---
'@commercetools-frontend/application-components': patch
'@commercetools-frontend/react-notifications': patch
'@commercetools-frontend/application-shell': patch
'@commercetools-frontend/permissions': patch
'@commercetools-frontend/sdk': patch
---

As part of the preparations for the upcoming update to the newest React version, we have updated how we manage components default properties as our current implementation will no longer be supported ([reference](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops)).

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
