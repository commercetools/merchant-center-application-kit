import { ReactNode, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import type { ReducersMapObject } from 'redux';
import type { TEnhancedStore } from '../../configure-store';

type Props = {
  id: string;
  reducers: ReducersMapObject;
  shouldCleanUpOnUnmount?: boolean;
  children: ReactNode;
};

const InjectReducers = ({ shouldCleanUpOnUnmount = true, ...props }: Props) => {
  const [areReducersInjected, setAreReducersInjected] = useState(false);
  const store = useStore() as TEnhancedStore;

  useEffect(() => {
    store.injectReducers({
      id: props.id,
      reducers: props.reducers,
    });
    setAreReducersInjected(true);

    return () => {
      if (shouldCleanUpOnUnmount) {
        store.removeReducers({ id: props.id });
      }
    };
  }, [props.id, props.reducers, shouldCleanUpOnUnmount, store]);

  // Render children only when the plugin reducers have been injected
  if (areReducersInjected) return <>{props.children}</>;
  return null;
};
InjectReducers.displayName = 'InjectReducers';

export default InjectReducers;
