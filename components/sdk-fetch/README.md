# Sdk.Fetch

Fetches data when rendered.

## Lifecycle

This component fetches when it first mounts. It refetches when
`actionCreatorArgs` change (when they are no longer deeply equal). This can be
customized by providing `shouldRefetch`.

## Props

* `actionCreator` _(Function)_ _optional_: This action creator is called with
  `actionCreatorArgs` as its arguments. The result is dispatched. The return
  value of this dispatch must be a promise, which either throws or resolves to
  the API response. `actionCreator` defaults to this module's `fetch` action
  creator.
* `actionCreatorArgs` _(Array)_ _optional_: A list of arguments for
  `actionCreator`. It is an array which is spread onto the action creator like
  so `actionCreator(...actionCreatorArgs)`.
* `shouldRefetch` _(Function)_ _optional_: When the component receives new
  `actionCreatorArgs` this function is called with the previous
  `actionCreatorArgs` and the new `actionCreatorArgs`. When it returns `true`
  the refetch will happen, otherwise it won't.
* `onSuccess` _(Function)_ _optional_: Called when the promise created by
  dispatching the action created by `actionCreator` resolves. The result will be
  the only argument.
* `onError` _(Function)_ _optional_: Called when the promise created by
  dispatching the action created by `actionCreator` throws.
* `render` _(Function)_ _required_: Called with an object as its first argument
  existing of `{ isLoading, result, error }`.
  * `isLoading` _(Boolean)_: `true` when a request is currently in flight.
  * `result` _(Any)_: What the promise resolved with, `null` in case it threw.
  * `error` _(Any)_: What the promise threw, `null` in case it resolved.

## Static Fields

* `Sdk.Fetch.errorHandler` contains _(Function)_: Error handler which is called
  when no `onError` prop was specified and an error happens while resolving the
  promise. This property can be overridden to replace the default error handler.
  The default error handler will throw the error.
