# ConfigurationProvider & injectConfiguration()

```js
<ConfigurationProvider configuration={some.global}>
  //...children
</ConfigurationProvider>

// Further down the component tree as a HoC

injectConfiguration(
  pathToConfiguration: String|[String],
): HigherOrderComponent

// or as a React component

<ConfigurationConsumer pathToConfiguration="a.b">
  {(configuration) => <div>{configuration}</div>}
</ConfigurationConsumer>
```

Note: The `pathToConfiguration` is passed to `loadsh.get` which accepts paths in
as an Array or String. As a result `['iam', 'nested']` is equal to
`'iam.nested'`.

Accepts an array of configuration properties defined on `ConfigurationProvider`
which generally provides `window.app`.

## Example Usage

```js
const Button = () => // ...

export default injectConfiguration(
  '',
)(Button)
```
