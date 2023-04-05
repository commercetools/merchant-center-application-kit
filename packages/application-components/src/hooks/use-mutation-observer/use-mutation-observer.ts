// NOTE: This React hook is essentially the same as the [@react-hook/intersection-observer](https://www.npmjs.com/package/@react-hook/intersection-observer)
// except for the usage of `MutationObserver` instead of `IntersectionObserver`.
import { useLayoutEffect } from 'react';
import useLatest from '@react-hook/latest';
import rafSchd from 'raf-schd';
import './polyfill';

type TUseMutationObserverCallback = (
  mutationRecord: MutationRecord,
  observer: MutationObserver
) => void;

let _mutationObserver: ReturnType<typeof createMutationObserver>;

const getMutationObserver = (options?: MutationObserverInit) =>
  !_mutationObserver
    ? (_mutationObserver = createMutationObserver(options))
    : _mutationObserver;

function useMutationObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: TUseMutationObserverCallback,
  options?: MutationObserverInit
): MutationObserver {
  const mutationObserver = getMutationObserver(options);
  const storedCallback = useLatest(callback);

  useLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = target && 'current' in target ? target.current : target;
    if (!targetEl) return () => {};

    function cb(entry: MutationRecord, observer: MutationObserver) {
      if (didUnsubscribe) return;
      storedCallback.current(entry, observer);
    }

    mutationObserver.subscribe(targetEl as HTMLElement, cb);

    return () => {
      didUnsubscribe = true;
      mutationObserver.unsubscribe(targetEl as HTMLElement, cb);
    };
  }, [target, mutationObserver, storedCallback]);

  return mutationObserver.observer;
}

function createMutationObserver(options?: MutationObserverInit) {
  const callbacks = new Map<Node, TUseMutationObserverCallback[]>();
  const observer = new MutationObserver(
    rafSchd((entries, obs) => {
      for (let i = 0; i < entries.length; i++) {
        const cbs = callbacks.get(entries[i].target);
        cbs?.forEach((cb) => cb(entries[i], obs));
      }
    })
  );

  return {
    observer,
    subscribe(target: HTMLElement, callback: TUseMutationObserverCallback) {
      observer.observe(target, options);
      const cbs = callbacks.get(target) ?? [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(target: HTMLElement, callback: TUseMutationObserverCallback) {
      const cbs = callbacks.get(target) ?? [];
      if (cbs.length === 1) {
        observer.disconnect();
        callbacks.delete(target);
        return;
      }
      const cbIndex = cbs.indexOf(callback);
      if (cbIndex !== -1) cbs.splice(cbIndex, 1);
      callbacks.set(target, cbs);
    },
  };
}

export default useMutationObserver;
