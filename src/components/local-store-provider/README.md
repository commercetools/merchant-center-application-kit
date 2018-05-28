# LocalStoreProvider

This component overrides the redux `store` to restrict the scope to a _plugin_.
In particular:

- `dispatch` wraps the action into a `LOCAL` action, meaning that the action is
  coming from a _plugin_
- `getState` will only return the state _slice_ for the specific _plugin_.
  Additionally a `globalAppState` field will be injected at runtime to provide
  values useful to plugins about application, user and project.

> Using this component requires that the **redux `store`** is defined up the
> context tree (`<Provider>`).

## To be deprecated behavior

This component is only needed for backwards compatibility reasons, as long as we
still have the "plugin system". Once we migrate to multiple applications, this
component can be removed.

## Desired behaviour

Whenever a component needs some information about e.g. the `user` or the
`project` it can simply wrap itself with `FetchUser` or `FetchProject` to get
the data directly. Application values such as `token` etc. can be loaded from
`localStorage`.
