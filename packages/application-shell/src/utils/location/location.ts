const replace = (url: string): void => window.location.replace(url);
const origin = window.location.origin;
const pathname = window.location.pathname;
const reload = window.location.reload;

const location = {
  replace,
  origin,
  pathname,
  reload,
};

export default location;
