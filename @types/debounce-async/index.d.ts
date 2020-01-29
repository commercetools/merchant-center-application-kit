declare module 'debounce-async' {
  type Options = {
    leading?: boolean;
    cancelObj?: string;
  };
  function debounceAsync<T>(func: T, wait?: number, options?: Options): T;
  export default debounceAsync;
}
