import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { VisualSpecGroup } from '@/storybook-helpers';
import {
  Box,
  Button,
  Flex,
  NimbusProvider,
  Region,
  Splitter,
  useRegion,
} from '@commercetools/nimbus';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createPortal } from 'react-dom';
import { MC_MAIN_CONTAINER_PORTAL_ID } from '@commercetools-frontend/constants';
import { REGIONS } from '../../constants';
import type { TApplicationShellSplitterValue } from './application-shell-splitter';

// Every shell needs its own portal target, so they can't share one id.
let shellCounter = 0;

const PortalIdContext = createContext<string>(MC_MAIN_CONTAINER_PORTAL_ID);

const SplitterShell = ({
  defaultOpen = false,
  children,
}: {
  defaultOpen?: boolean;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [portalId] = useState(
    () => `${MC_MAIN_CONTAINER_PORTAL_ID}-${shellCounter++}`
  );

  const controller = {
    isCollapsed: !open,
    expand: () => setOpen(true),
    collapse: () => setOpen(false),
    toggle: () => setOpen((isOpen: boolean) => !isOpen),
  };

  return (
    <NimbusProvider
      locale="en"
      router={{ navigate: () => {} }}
      loadFonts={false}
    >
      <PortalIdContext.Provider value={portalId}>
        <Splitter.Root
          orientation="horizontal"
          defaultSize={30}
          minSize={20}
          maxSize={40}
          collapsible
          collapsedSize={0}
          collapsed={!open}
          onCollapsedChange={(isCollapsed: boolean) => setOpen(!isCollapsed)}
          style={{ height: '100%' }}
        >
          <Splitter.Main style={{ containerType: 'inline-size', minWidth: 0 }}>
            <Flex
              direction="column"
              height="100%"
              position="relative"
              overflow="auto"
            >
              <Box flexGrow={1}>{children}</Box>
              <Box
                id={portalId}
                position="sticky"
                bottom={0}
                zIndex={9999}
                pointerEvents="none"
              />
            </Flex>
          </Splitter.Main>
          <Splitter.Handle aria-label="Resize side panel" />
          <Splitter.Aside>
            <Region name={REGIONS.MC_RIGHT_PANEL} value={controller} />
          </Splitter.Aside>
        </Splitter.Root>
      </PortalIdContext.Provider>
    </NimbusProvider>
  );
};

const AsideContent = ({ autoExpand = false }: { autoExpand?: boolean }) => {
  const { Region: Filler, value } = useRegion<TApplicationShellSplitterValue>(
    REGIONS.MC_RIGHT_PANEL
  );

  useEffect(() => {
    if (autoExpand) {
      value?.expand();
    }
  }, [value, autoExpand]);

  return (
    <Filler>
      <Box padding={4} bg="warning.3" height="100%">
        <Box as="h3" marginBottom={2}>
          {'Side Panel'}
        </Box>
        <Box as="p">{'Region-portalled content in the aside pane.'}</Box>
      </Box>
    </Filler>
  );
};

const MainContent = ({ children }: { children?: ReactNode }) => (
  <Box padding={6} bg="positive.3" height="100%">
    <Box as="h2" marginBottom={2}>
      {'Main Content'}
    </Box>
    <Box as="p" marginBottom={4}>
      {'This is the main content area inside Splitter.Main.'}
    </Box>
    {children}
  </Box>
);

const FakeSaveToolbar = ({
  visible,
  onCancel,
  onSave,
}: {
  visible: boolean;
  onCancel?: () => void;
  onSave?: () => void;
}) => {
  const portalId = useContext(PortalIdContext);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.getElementById(portalId));
  }, [portalId]);

  if (!visible) return null;

  const toolbar = (
    <Flex
      justify="space-between"
      align="center"
      paddingX={4}
      paddingY={3}
      bg="info.4"
      borderTopRadius="md"
      width="100%"
      pointerEvents="auto"
      data-testid="fake-save-toolbar"
    >
      <Button variant="subtle" onPress={onCancel}>
        {'Cancel'}
      </Button>
      <Button variant="solid" onPress={onSave}>
        {'Save'}
      </Button>
    </Flex>
  );

  return portalTarget ? createPortal(toolbar, portalTarget) : null;
};

const ToolbarDemo = () => {
  const [showToolbar, setShowToolbar] = useState(true);
  return (
    <>
      <MainContent>
        {!showToolbar && (
          <Button variant="subtle" onPress={() => setShowToolbar(true)}>
            {'Show toolbar'}
          </Button>
        )}
      </MainContent>
      <AsideContent />
      <FakeSaveToolbar
        visible={showToolbar}
        onCancel={() => setShowToolbar(false)}
        onSave={() => setShowToolbar(false)}
      />
    </>
  );
};

// `Splitter.Root` is `height: 100%`, so each state needs a bounded ancestor. Tall
// enough to show the panes, the handle and the sticky toolbar, and no taller.
const Frame = ({ children }: { children: ReactNode }) => (
  <div style={{ height: '200px' }}>{children}</div>
);

const meta: Meta = {
  title: 'Application Shell/ShellSplitter',
};

export default meta;

type Story = StoryObj;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="ShellSplitter - Aside collapsed (default)">
        <Frame>
          <SplitterShell>
            <MainContent />
          </SplitterShell>
        </Frame>
      </VisualSpecGroup>
      <VisualSpecGroup label="ShellSplitter - Aside expanded via Region">
        <Frame>
          <SplitterShell>
            <MainContent />
            <AsideContent autoExpand />
          </SplitterShell>
        </Frame>
      </VisualSpecGroup>
      <VisualSpecGroup label="ShellSplitter - Aside expanded (defaultOpen)">
        <Frame>
          <SplitterShell defaultOpen>
            <MainContent />
            <AsideContent />
          </SplitterShell>
        </Frame>
      </VisualSpecGroup>
      <VisualSpecGroup label="ShellSplitter - Save toolbar portaled (aside collapsed, toggleable)">
        <Frame>
          <SplitterShell>
            <ToolbarDemo />
          </SplitterShell>
        </Frame>
      </VisualSpecGroup>
      <VisualSpecGroup label="ShellSplitter - Save toolbar portaled (aside expanded, toggleable)">
        <Frame>
          <SplitterShell defaultOpen>
            <ToolbarDemo />
          </SplitterShell>
        </Frame>
      </VisualSpecGroup>
    </>
  ),
};
