import { type ReactNode, lazy, Suspense } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import { MC_MAIN_CONTAINER_PORTAL_ID } from '@commercetools-frontend/constants';

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
    <>
      <Suspense fallback={props.children}>
        <LazyApplicationShellSplitter
          locale={props.locale}
          navigate={history.push}
        >
          {props.children}
        </LazyApplicationShellSplitter>
      </Suspense>
      {/* Portal target for SaveToolbar. Rendered outside Suspense so it
          exists in both the Nimbus and Passthrough paths, and outside
          Splitter.Main so container-type:inline-size does not trap
          position:fixed. z-index 10001 beats the modal portals
          container (z-index 10000). */}
      <div
        id={MC_MAIN_CONTAINER_PORTAL_ID}
        css={css`
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10001;
        `}
      />
    </>
  );
};

export default ApplicationShellSplitterWrapper;
