export { default as version } from './version';
export const put = (key: string, value: string) =>
  window.localStorage.setItem(key, value);
export const get = (key: string) => window.localStorage.getItem(key);
export const remove = (key: string) => window.localStorage.removeItem(key);
export const clear = () => window.localStorage.clear();
