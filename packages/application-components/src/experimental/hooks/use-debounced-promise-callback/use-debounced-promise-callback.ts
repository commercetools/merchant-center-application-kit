import debounce from 'debounce-promise';
import { useCallback } from 'react';

const useDebouncedPromiseCallback = <T extends (...args: any[]) => any>(
  promiseCallback: T,
  wait: number
) => useCallback(debounce(promiseCallback, wait), [promiseCallback]);

export default useDebouncedPromiseCallback;
