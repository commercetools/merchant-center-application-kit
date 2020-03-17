const replace = (url: string): void => window.location.replace(url);
const reload = window.location.reload;

const location = {
  replace,
  reload,
};

export default location;
