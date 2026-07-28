import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Button,
  Flex,
  NimbusProvider,
  Region,
  Splitter,
  useRegion,
} from '@commercetools/nimbus';
import { createPortal } from 'react-dom';
import {
  REGIONS,
  type TApplicationShellSplitterValue,
} from '@commercetools-frontend/application-shell';
import { MC_MAIN_CONTAINER_PORTAL_ID } from '@commercetools-frontend/constants';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/shell-splitter';

let shellCounter = 0;

const PortalIdContext = createContext<string>(MC_MAIN_CONTAINER_PORTAL_ID);

type SplitterShellProps = {
  defaultOpen?: boolean;
  children: ReactNode;
};

const SplitterShell = ({
  defaultOpen = false,
  children,
}: SplitterShellProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const [portalId] = useState(
    () => `${MC_MAIN_CONTAINER_PORTAL_ID}-${shellCounter++}`
  );

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
      <PortalIdContext.Provider value={portalId}>
        <Splitter.Root
          orientation="horizontal"
          defaultSize={30}
          minSize={20}
          maxSize={40}
          collapsible
          collapsedSize={0}
          collapsed={!open}
          onCollapsedChange={(c: boolean) => setOpen(!c)}
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
SplitterShell.displayName = 'SplitterShell';

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
          Side Panel
        </Box>
        <Box as="p">Region-portalled content in the aside pane.</Box>
      </Box>
    </Filler>
  );
};
AsideContent.displayName = 'AsideContent';

const MainContent = ({ children }: { children?: ReactNode }) => (
  <Box padding={6} bg="positive.3" height="100%">
    <Box as="h2" marginBottom={2}>
      Main Content
    </Box>
    <Box as="p" marginBottom={4}>
      This is the main content area inside Splitter.Main.
    </Box>
    {children}
  </Box>
);
MainContent.displayName = 'MainContent';

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
      <Button variant="secondary" onPress={onCancel}>
        Cancel
      </Button>
      <Button variant="solid" onPress={onSave}>
        Save
      </Button>
    </Flex>
  );

  if (portalTarget) {
    return createPortal(toolbar, portalTarget);
  }

  return null;
};
FakeSaveToolbar.displayName = 'FakeSaveToolbar';

const ToolbarDemo = () => {
  const [showToolbar, setShowToolbar] = useState(true);

  return (
    <>
      <MainContent>
        {!showToolbar && (
          <Button variant="secondary" onPress={() => setShowToolbar(true)}>
            Show toolbar
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
ToolbarDemo.displayName = 'ToolbarDemo';

export const Component = () => (
  <Suite>
    <Spec
      label="ShellSplitter - Aside collapsed (default)"
      size="m"
      omitPropsList
    >
      <SplitterShell>
        <MainContent />
      </SplitterShell>
    </Spec>
    <Spec
      label="ShellSplitter - Aside expanded via Region"
      size="m"
      omitPropsList
    >
      <SplitterShell>
        <MainContent />
        <AsideContent autoExpand />
      </SplitterShell>
    </Spec>
    <Spec
      label="ShellSplitter - Aside expanded (defaultOpen)"
      size="m"
      omitPropsList
    >
      <SplitterShell defaultOpen>
        <MainContent />
        <AsideContent />
      </SplitterShell>
    </Spec>
    <Spec
      label="ShellSplitter - Save toolbar portaled (aside collapsed, toggleable)"
      size="m"
      omitPropsList
    >
      <SplitterShell>
        <ToolbarDemo />
      </SplitterShell>
    </Spec>
    <Spec
      label="ShellSplitter - Save toolbar portaled (aside expanded, toggleable)"
      size="m"
      omitPropsList
    >
      <SplitterShell defaultOpen>
        <ToolbarDemo />
      </SplitterShell>
    </Spec>
  </Suite>
);
