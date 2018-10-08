import { __GLOBAL } from '@commercetools-frontend/constants';

export default function toGlobal(action) {
  return {
    type: __GLOBAL,
    payload: action,
  };
}
