import { useEffect, useRef } from 'react';
import {
  useRegion,
  Button,
  IconButton,
  Box,
  Stack,
  Text,
  ScrollArea,
  Badge,
} from '@commercetools/nimbus';
import { Close, OpenInNew } from '@commercetools/nimbus-icons';
import { REGIONS } from '@commercetools-frontend/application-shell';

const SplitterDemo = () => {
  const { Region: Filler, value } = useRegion(REGIONS.MC_RIGHT_PANEL);
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    valueRef.current?.expand();
    return () => valueRef.current?.collapse();
  }, []);

  return (
    <Box p="600">
      <Stack direction="column" gap="500">
        <Stack direction="column" gap="200">
          <Text fontSize="2xl" fontWeight="bold">
            Splitter Demo
          </Text>
          <Text color="neutral.11">
            This page demonstrates the shell splitter with Region-based content
            projection.
          </Text>
        </Stack>

        <Stack direction="row" gap="300" alignItems="center">
          <Badge
            colorPalette={value?.isCollapsed ? 'neutral' : 'positive'}
            variant="solid"
          >
            {value?.isCollapsed ? 'Panel closed' : 'Panel open'}
          </Badge>
          <Button onPress={() => value?.toggle()} variant="outline" size="sm">
            <OpenInNew />
            Toggle panel
          </Button>
        </Stack>
      </Stack>

      <Filler>
        <Stack direction="column" h="100%" bg="neutral.1">
          <Box px="400" py="300" borderBottomWidth="25" borderColor="neutral.6">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontWeight="semibold" fontSize="md">
                Side Panel
              </Text>
              <IconButton
                aria-label="Close panel"
                variant="ghost"
                size="xs"
                onPress={() => value?.collapse()}
              >
                <Close />
              </IconButton>
            </Stack>
          </Box>

          <ScrollArea flex="1">
            <Stack direction="column" gap="400" p="400">
              <Box p="400" bg="primary.3" borderRadius="md">
                <Stack direction="column" gap="200">
                  <Text fontWeight="semibold" color="primary.11">
                    Region portalling
                  </Text>
                  <Text fontSize="sm" color="primary.11">
                    This content is rendered via the Nimbus Region primitive. It
                    lives in the playground&apos;s React tree but paints here in
                    the shell aside.
                  </Text>
                </Stack>
              </Box>

              <Box p="400" bg="neutral.3" borderRadius="md">
                <Stack direction="column" gap="200">
                  <Text fontWeight="semibold">Context preservation</Text>
                  <Text fontSize="sm" color="neutral.11">
                    Router, intl, Apollo, permissions — all ancestor context is
                    preserved because Region uses React portals under the hood.
                  </Text>
                </Stack>
              </Box>

              <Box p="400" bg="neutral.3" borderRadius="md">
                <Stack direction="column" gap="200">
                  <Text fontWeight="semibold">Responsive behavior</Text>
                  <Text fontSize="sm" color="neutral.11">
                    Below 1440px the panel becomes a full-width overlay. Above
                    1440px it&apos;s a resizable side-by-side split. Drag the
                    handle or use arrow keys when focused.
                  </Text>
                </Stack>
              </Box>

              <Button
                onPress={() => value?.collapse()}
                variant="outline"
                colorPalette="neutral"
                w="100%"
              >
                <Close />
                Close panel
              </Button>
            </Stack>
          </ScrollArea>
        </Stack>
      </Filler>
    </Box>
  );
};

export default SplitterDemo;
