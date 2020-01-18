import React from 'react';
import { ReducersMapObject } from 'redux';
import { useStore } from 'react-redux';
import { TEnhancedStore } from '../../configure-store';

type Props = {
  id: string;
  reducers: ReducersMapObject;
  shouldCleanUpOnUnmount: boolean;
  children: React.ReactNode;
};

const defaultProps: Pick<Props, 'shouldCleanUpOnUnmount'> = {
  shouldCleanUpOnUnmount: true,
};

const InjectReducers = (props: Props) => {
  const [areReducersInjected, setAreReducersInjected] = React.useState(false);
  const store = useStore() as TEnhancedStore;

  React.useEffect(() => {
    store.injectReducers({
      id: props.id,
      reducers: props.reducers,
    });
    setAreReducersInjected(true);

    return () => {
      if (props.shouldCleanUpOnUnmount) {
        store.removeReducers({ id: props.id });
      }
    };
  }, [props.id, props.reducers, props.shouldCleanUpOnUnmount, store]);

  // Render children only when the plugin reducers have been injected
  if (areReducersInjected) return <>{props.children}</>;
  return null;
};
InjectReducers.displayName = 'InjectReducers';
InjectReducers.defaultProps = defaultProps;

export default InjectReducers;
