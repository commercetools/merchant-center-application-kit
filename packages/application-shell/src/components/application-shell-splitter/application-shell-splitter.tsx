import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import type { NimbusRouterConfig } from '@commercetools/nimbus';
import {
  NimbusProvider,
  Splitter,
  Region,
  useResponsiveSplitterSizes,
} from '@commercetools/nimbus';
import { REGIONS } from '../../constants';

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

const ApplicationShellSplitter = (props: TApplicationShellSplitterProps) => {
  const [open, setOpen] = useState(false);

  const onCollapsedChange = useCallback((collapsed: boolean) => {
    setOpen(!collapsed);
  }, []);

  const { rootProps } = useResponsiveSplitterSizes({
    orientation: 'horizontal',
    persistKey: REGIONS.MC_RIGHT_PANEL,
    size: { 0: '100%', [OVERLAY_THRESHOLD]: 'sm' },
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
        <Splitter.Main id={SPLITTER_MAIN_ID} containerType="inline-size">
          {props.children}
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
