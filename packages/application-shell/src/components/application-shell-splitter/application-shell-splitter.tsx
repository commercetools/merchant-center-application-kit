import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import type { NimbusRouterConfig } from '@commercetools/nimbus';
import {
  NimbusProvider,
  Splitter,
  Region,
  useResponsiveSplitterSizes,
} from '@commercetools/nimbus';
import { MC_MAIN_CONTAINER_PORTAL_ID } from '@commercetools-frontend/constants';
import { REGIONS } from '../../constants';

/**
 * Whether `@commercetools/nimbus` actually resolved at build time. When an app
 * has not installed Nimbus, the mc-scripts bundler fallback stubs the import to
 * an empty module, so the bindings above are `undefined`. The async wrapper
 * reads this flag and renders a passthrough instead of mounting the splitter, so
 * Nimbus hooks (e.g. `useResponsiveSplitterSizes`) are never called without
 * Nimbus present. See nimbus `home-bundler-plugins.mdx` ("shared code is
 * responsible for checking whether Nimbus is available before rendering").
 */
export const hasNimbus = typeof Splitter !== 'undefined';

type TApplicationShellSplitterProps = {
  children: ReactNode;
  locale: string;
  navigate: NimbusRouterConfig['navigate'];
};

export type TApplicationShellSplitterValue = {
  isCollapsed: boolean;
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
};

// breakpoint-lg (1024) + sm (384) = 1408
// Below 1408px container: overlay — one panel visible at a time
// Above 1408px container: side-by-side — main ≥ 1024px, aside ≥ 384px
const OVERLAY_THRESHOLD = 1408;

const SPLITTER_ROOT_ID = 'mc-shell-splitter';
const SPLITTER_MAIN_ID = 'mc-shell-splitter-main';
const SPLITTER_ASIDE_ID = 'mc-shell-splitter-aside';

// `relative` so the empty #mc-main-container-portal div below sizes to
// Splitter.Main, not the window.
// `isolate` so the bar can sit on the
// form, not on the AI chat.
const splitterMainStyle = {
  position: 'relative',
  isolation: 'isolate',
} as const;

// Stretch the empty portal div over Splitter.Main so the save bar
// matches that space, not the window or the chat.
// `inset: 0` covers the page so `pointer-events: none` lets clicks reach what is under it.
// `z-index: 10001` is the same as the no-splitter fallback and sits above `#portals-container` (10000).
const portalInMainPaneCss = css`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 10001;
  transform: translateZ(0);
`;

const ApplicationShellSplitter = (props: TApplicationShellSplitterProps) => {
  const [open, setOpen] = useState(false);

  const onCollapsedChange = useCallback((collapsed: boolean) => {
    setOpen(!collapsed);
  }, []);

  const { rootProps } = useResponsiveSplitterSizes({
    orientation: 'horizontal',
    persistKey: REGIONS.MC_RIGHT_PANEL,
    size: { 0: '100%', [OVERLAY_THRESHOLD]: 'md' },
    minSize: { 0: '100%', [OVERLAY_THRESHOLD]: 'sm' },
    maxSize: { 0: '100%', [OVERLAY_THRESHOLD]: '50%' },
    onCollapsedChange,
  });

  // Ref to the hook's composite handler for programmatic control.
  // The hook's handler does persistence suppression + calls our onCollapsedChange.
  const compositeHandlerRef = useRef(rootProps.onCollapsedChange);
  compositeHandlerRef.current = rootProps.onCollapsedChange;

  const openRef = useRef(open);
  openRef.current = open;

  const commands = useRef({
    expand: () => compositeHandlerRef.current(false),
    collapse: () => compositeHandlerRef.current(true),
    toggle: () => compositeHandlerRef.current(openRef.current),
  }).current;

  const controller = useMemo<TApplicationShellSplitterValue>(
    () => ({ isCollapsed: !open, ...commands }),
    [open, commands]
  );

  return (
    <NimbusProvider
      locale={props.locale}
      router={{ navigate: props.navigate }}
      loadFonts={false}
    >
      <Splitter.Root
        {...rootProps}
        id={SPLITTER_ROOT_ID}
        collapsible
        collapsedSize={0}
        collapsed={!open}
      >
        <Splitter.Main
          id={SPLITTER_MAIN_ID}
          containerType="inline-size"
          style={splitterMainStyle}
        >
          {props.children}
          <div
            id={MC_MAIN_CONTAINER_PORTAL_ID}
            data-testid={MC_MAIN_CONTAINER_PORTAL_ID}
            css={portalInMainPaneCss}
          />
        </Splitter.Main>
        <Splitter.Handle aria-label="Resize side panel" />
        <Splitter.Aside id={SPLITTER_ASIDE_ID}>
          <Region name={REGIONS.MC_RIGHT_PANEL} value={controller} />
        </Splitter.Aside>
      </Splitter.Root>
    </NimbusProvider>
  );
};

export default ApplicationShellSplitter;
