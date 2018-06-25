import { __GLOBAL } from '@commercetools-local/constants';

export default function toGlobal(action) {
  return {
    type: __GLOBAL,
    payload: action,
  };
}
