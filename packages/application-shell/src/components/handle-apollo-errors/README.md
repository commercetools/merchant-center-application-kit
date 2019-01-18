# `handleApolloErrors`

Handles `ApolloError`s from GraphQL queries to dispatch notification errors.

## Motivation

When using the `graphql` HOC to send queries, it's a bit tricky to handle possible errors. For instance, the _connected_ component will need to check the `error` prop within the graphql query object and decide what to do. Most of the time, we simply want to dispatch a page notification to show an error message, some other times we might want to handle the error within that component.

In the first case, we use this HOC to dispatch the notification errors for us.

## Usage

> This HOC should be composed **after** the `graphql` query components, to be able to access the query props.

```js
compose(
  graphql(MyQuery, { name: 'user' }),
  graphql(MyQuery, { name: 'project' }),
  handleApolloErrors(['user', 'project'])
);
```
