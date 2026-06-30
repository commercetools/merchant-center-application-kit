import { type ReactNode, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

const LazyApplicationShellSplitter = lazy(() =>
  import(
    './application-shell-splitter' /* webpackChunkName: "application-shell-splitter" */
  ).catch(() => ({
    default: ({ children }: { children: ReactNode }) => <>{children}</>,
  }))
);

type TApplicationShellSplitterWrapperProps = {
  children: ReactNode;
  locale: string;
};

const ApplicationShellSplitterWrapper = (
  props: TApplicationShellSplitterWrapperProps
) => {
  const history = useHistory();

  return (
    <Suspense fallback={props.children}>
      <LazyApplicationShellSplitter
        locale={props.locale}
        navigate={history.push}
      >
        {props.children}
      </LazyApplicationShellSplitter>
    </Suspense>
  );
};

export default ApplicationShellSplitterWrapper;
