import { type ReactNode, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

const Passthrough = ({ children }: { children: ReactNode }) => <>{children}</>;

const LazyApplicationShellSplitter = lazy(() =>
  import(
    './application-shell-splitter' /* webpackChunkName: "application-shell-splitter" */
  )
    // When `@commercetools/nimbus` is not installed, the mc-scripts bundler
    // fallback stubs it to an empty module so the build succeeds — but the
    // splitter's Nimbus bindings are then `undefined`. `hasNimbus` reflects that;
    // render a passthrough so no Nimbus code path is mounted.
    .then((mod) =>
      mod.hasNimbus ? { default: mod.default } : { default: Passthrough }
    )
    // Belt-and-suspenders: if the chunk fails to load outright, still degrade.
    .catch(() => ({ default: Passthrough }))
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
