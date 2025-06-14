import { Fragment, useEffect, type ReactNode } from 'react';
import useWindowHeight from '../hooks/use-window-height';

type TLayoutAppProps = {
  children: ReactNode;
};

const LayoutApp = (props: TLayoutAppProps) => {
  const height = useWindowHeight();
  useEffect(() => {
    window.parent.postMessage(['playground-height', height], '*');
  }, [height]);
  return <Fragment>{props.children}</Fragment>;
};

export default LayoutApp;
