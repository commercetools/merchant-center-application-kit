import debounce from 'debounce-promise';
import { useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebouncedCallback<T> = (...args: any[]) => Promise<T>;

const useDebouncedPromiseCallback = <T>(
  promiseCallback: DebouncedCallback<T>,
  delayedTimeMS: number
): DebouncedCallback<T> => {
  const debounced = debounce(promiseCallback, delayedTimeMS);
  return useCallback(() => debounced(), [debounced]);
};

export default useDebouncedPromiseCallback;
