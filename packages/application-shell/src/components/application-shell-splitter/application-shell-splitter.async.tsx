import { type ReactNode, lazy, Suspense } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import { MC_MAIN_CONTAINER_PORTAL_ID } from '@commercetools-frontend/constants';

// Styles for the empty portal div when the splitter is not mounted:
// There is no Splitter.Main to size to, so pin the div to the bottom
// of the window (the old full-width bar).
const fallbackPortalCss = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10001;
`;

// Renders the empty #mc-main-container-portal div so the save bar has
// a place to draw into. Used when the splitter is not mounted
// (Nimbus missing, or the chunk failed / is still loading).
const FallbackSaveToolbarPortal = () => (
  <div id={MC_MAIN_CONTAINER_PORTAL_ID} css={fallbackPortalCss} />
);

const Passthrough = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <FallbackSaveToolbarPortal />
  </>
);

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
    // Do not leave the old "outside the splitter" box next to Suspense.
    // The splitter already puts one in the main pane; two same ids clash.
    // Only the no-splitter paths (fallback + Passthrough) need this one.
    <Suspense
      fallback={
        <>
          {props.children}
          <FallbackSaveToolbarPortal />
        </>
      }
    >
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
