export const put = (key, value, { storage = window.localStorage } = {}) =>
  storage.setItem(key, value);
export const get = (key, { storage = window.localStorage } = {}) =>
  storage.getItem(key);
export const remove = (key, { storage = window.localStorage } = {}) =>
  storage.removeItem(key);
export const clear = ({ storage = window.localStorage } = {}) =>
  storage.clear();
