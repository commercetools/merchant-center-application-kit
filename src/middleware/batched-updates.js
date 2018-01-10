// TODO: use `redux-batched-updates` once it has support for react 0.14
// See https://github.com/acdlite/redux-batched-updates/issues/2

/* eslint-disable camelcase */
import { unstable_batchedUpdates as unstableBatchedUpdates } from 'react-dom';

export default function batchedUpdates() {
  return next => action => unstableBatchedUpdates(() => next(action));
}
