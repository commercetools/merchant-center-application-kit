# ProvideConfiguration & injectConfiguration()

```js
<ProvideConfiguration configuration={some.global}>
  //...children
</ProvideConfiguration>

// Further down the component tree

injectConfiguration(
  pathToConfiguration: String|[String],
): HigherOrderComponent
```

Note: The `pathToConfiguration` is passed to `loadsh.get` which accepts paths in
as an Array or String. As a result `['iam', 'nested']` is equal to
`'iam.nested'`.

Accepts an array of configuration properties defined on `ProvideConfiguration`
which generally provides `window.app`.

## Example Usage

```js
const Button = () => // ...

export default injectConfiguration(
  '',
)(Button)
```
