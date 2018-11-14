export const put = (key, value) => window.localStorage.setItem(key, value);
export const get = key => window.localStorage.getItem(key);
export const remove = key => window.localStorage.removeItem(key);
export const clear = () => window.localStorage.clear();
