import { type ReactNode, useMemo, useRef, useState } from 'react';
import type { NimbusRouterConfig } from '@commercetools/nimbus';
import { NimbusProvider, Splitter, Region } from '@commercetools/nimbus';
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

const ApplicationShellSplitter = (props: TApplicationShellSplitterProps) => {
  const [open, setOpen] = useState(false);

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
        collapsible
        collapsed={!open}
        onCollapsedChange={(c) => setOpen(!c)}
        defaultSize={30}
        minSize={15}
        maxSize={50}
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
