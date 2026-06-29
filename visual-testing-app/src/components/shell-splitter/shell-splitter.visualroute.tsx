import { type ReactNode, useState, useEffect } from 'react';
import {
  NimbusProvider,
  Splitter,
  Region,
  useRegion,
} from '@commercetools/nimbus';
import { REGIONS } from '@commercetools-frontend/application-shell';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/shell-splitter';

type SplitterShellProps = {
  defaultOpen?: boolean;
  children: ReactNode;
};

const SplitterShell = ({
  defaultOpen = false,
  children,
}: SplitterShellProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const controller = {
    isCollapsed: !open,
    expand: () => setOpen(true),
    collapse: () => setOpen(false),
    toggle: () => setOpen((o: boolean) => !o),
  };

  return (
    <NimbusProvider
      locale="en"
      router={{ navigate: () => {} }}
      loadFonts={false}
    >
      <Splitter.Root
        orientation="horizontal"
        defaultSize={30}
        minSize={20}
        maxSize={40}
        collapsible
        collapsedSize={0}
        collapsed={!open}
        onCollapsedChange={(c: boolean) => setOpen(!c)}
      >
        <Splitter.Main style={{ containerType: 'inline-size', minWidth: 0 }}>
          {children}
        </Splitter.Main>
        <Splitter.Handle aria-label="Resize side panel" />
        <Splitter.Aside>
          <Region name={REGIONS.MC_RIGHT_PANEL} value={controller} />
        </Splitter.Aside>
      </Splitter.Root>
    </NimbusProvider>
  );
};
SplitterShell.displayName = 'SplitterShell';

const AsideContent = () => {
  const { Region: Filler, value } = useRegion(REGIONS.MC_RIGHT_PANEL);

  useEffect(() => {
    value?.expand();
  }, [value]);

  return (
    <Filler>
      <div style={{ padding: 16, background: '#f5f5f5', height: '100%' }}>
        <h3 style={{ margin: '0 0 8px' }}>Side Panel</h3>
        <p style={{ margin: 0 }}>Region-portalled content in the aside pane.</p>
      </div>
    </Filler>
  );
};
AsideContent.displayName = 'AsideContent';

const MainContent = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ margin: '0 0 8px' }}>Main Content</h2>
    <p style={{ margin: 0 }}>
      This is the main content area inside Splitter.Main.
    </p>
  </div>
);
MainContent.displayName = 'MainContent';

export const Component = () => (
  <Suite>
    <Spec
      label="ShellSplitter - Aside collapsed (default)"
      size="l"
      omitPropsList
    >
      <SplitterShell>
        <MainContent />
      </SplitterShell>
    </Spec>
    <Spec
      label="ShellSplitter - Aside expanded via Region"
      size="l"
      omitPropsList
    >
      <SplitterShell>
        <MainContent />
        <AsideContent />
      </SplitterShell>
    </Spec>
    <Spec
      label="ShellSplitter - Aside expanded (defaultOpen)"
      size="l"
      omitPropsList
    >
      <SplitterShell defaultOpen>
        <MainContent />
        <AsideContent />
      </SplitterShell>
    </Spec>
  </Suite>
);
