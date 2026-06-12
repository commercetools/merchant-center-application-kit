import { type ReactNode, useMemo, useRef, useState } from 'react';
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

// 1444px = 1024px (WINDOW_SIZES.STANDARD main min) + 420px (aside min)
const BREAKPOINT_SIDE_BY_SIDE = 1444;

const ApplicationShellSplitter = (props: TApplicationShellSplitterProps) => {
  const [open, setOpen] = useState(false);

  const { rootProps } = useResponsiveSplitterSizes({
    orientation: 'horizontal',
    persistKey: REGIONS.MC_RIGHT_PANEL,
    size: { 0: '100%', [BREAKPOINT_SIDE_BY_SIDE]: 420 },
    minSize: { 0: '100%', [BREAKPOINT_SIDE_BY_SIDE]: 420 },
    maxSize: { [BREAKPOINT_SIDE_BY_SIDE]: 640 },
  });

  const commands = useRef({
    expand: () => setOpen(true),
    collapse: () => setOpen(false),
    toggle: () => setOpen((o) => !o),
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
        collapsible
        collapsedSize={0}
        collapsed={!open}
        onCollapsedChange={(c: boolean) => setOpen(!c)}
      >
        <Splitter.Main style={{ containerType: 'inline-size', minWidth: 0 }}>
          {props.children}
        </Splitter.Main>
        <Splitter.Handle aria-label="Resize side panel" />
        <Splitter.Aside>
          <Region name={REGIONS.MC_RIGHT_PANEL} value={controller} />
        </Splitter.Aside>
      </Splitter.Root>
    </NimbusProvider>
  );
};

export default ApplicationShellSplitter;
