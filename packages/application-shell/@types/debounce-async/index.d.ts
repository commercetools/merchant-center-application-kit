declare module 'debounce-async' {
  type Options = {
    leading?: boolean;
    cancelObj?: string;
  };
  export default function debounceAsync<T>(
    func: T,
    wait?: number,
    options?: Options
  ): T;
}
