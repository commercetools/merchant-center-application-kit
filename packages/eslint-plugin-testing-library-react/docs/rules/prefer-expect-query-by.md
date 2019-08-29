# Avoid using `expect(getBy*)` (prefer-expect-query-by)

React (DOM) Testing Library support two types of queries: `getBy*` and `queryBy*`. Using `getBy*` throws an error in case the element is not found. This is useful when using method like `waitForElement`, which are `async` functions and therefore throwing an error will cause the test to stop.
However, when trying to assert if an element is not in the document, we obviously can't use `getBy*`. Instead we should use `queryBy*`, which does not throw and therefore we can assert that `expect(queryByText("Foo")).not.toBeInTheDocument()`.

## Rule details

This rule triggers an error if `expect(getBy*)` is used.

This rule is enabled by default.

### Default configuration

The following patterns is considered error:

```js
test('some test', () => {
  expect(getByText('Foo')).not.toBeInTheDocument();
});
```

The following pattern is not considered error:

```js
test('some test', async () => {
  expect(queryByText('Foo')).not.toBeInTheDocument();
});
```
