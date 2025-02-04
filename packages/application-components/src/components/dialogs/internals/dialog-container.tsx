import {
  useState,
  useEffect,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Root as DialogRoot,
  Portal as DialogPortal,
  type DialogContentProps,
} from '@radix-ui/react-dialog';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import Card from '@commercetools-uikit/card';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { useWarning } from '@commercetools-uikit/utils';
import {
  DialogOverlay,
  DialogContent,
  ClickableDialogContent,
} from './dialog.styles';

// When running tests, we don't render the AppShell. Instead we mock the
// application context to make the data available to the application under
// test. However, this also means that the AppShell tree is not rendered,
// which contains among other things the <div id="portals-container" />
// element, used to render the modal content.
// Apparently though, when the <Modal> component unmounts between tests, it
// tries to remove the child elements within the parent selector
// ("portals-container") which may have been cleaned up by another test,
// resulting in the <Modal> to throw an NotFoundError.
// To solve this, we can simply use "document.body" as the parent selector
// instead of a specific element that will be cleaned up, resulting in
// console errors (even though the test passes). We only need to to this in
// test environment.
const getDefaultParentSelector = () =>
  process.env.NODE_ENV === 'test'
    ? document.body
    : (document.querySelector<HTMLElement>(
        `#${PORTALS_CONTAINER_ID}`
      ) as HTMLElement);

type Props = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  size?: 'm' | 'l' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 16 | 'scale';
  zIndex?: number;
  title: ReactNode;
  'aria-label'?: string;
  children: ReactNode;
  getParentSelector?: typeof getDefaultParentSelector;
};

type GridAreaProps = {
  name: string;
};

const GridArea = styled.div<GridAreaProps>`
  grid-area: ${(props) => props.name};
`;

const DialogContainer = ({
  size = 13,
  getParentSelector = getDefaultParentSelector,
  ...props
}: Props) => {
  useWarning(
    typeof props.title === 'string' ||
      (typeof props.title !== 'string' && Boolean(props['aria-label'])),
    'app-kit/DialogHeader: "aria-label" prop is required when the "title" prop is not a string.'
  );
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    const container = getParentSelector();
    if (container) {
      setPortalContainer(container);
    }
  }, []);

  const dialogAccessibleLabel =
    typeof props.title === 'string' ? props.title : props['aria-label'];

  return (
    <DialogRoot open={props.isOpen} modal={false}>
      <DialogPortal container={portalContainer}>
        <DialogOverlay data-role="dialog-overlay" zIndex={props.zIndex}>
          <DialogContent>
            <ClickableDialogContent
              size={size}
              onEscapeKeyDown={
                props.onClose as DialogContentProps['onEscapeKeyDown']
              }
              onPointerDownOutside={
                props.onClose as DialogContentProps['onPointerDownOutside']
              }
              aria-describedby={undefined}
              aria-labelledby=""
              aria-label={dialogAccessibleLabel}
            >
              <GridArea name="top" />
              <GridArea name="left" />
              <GridArea name="right" />
              <GridArea name="bottom" />
              <GridArea
                name="main"
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                  overflow: hidden;
                `}
              >
                <Card
                  // 1. For the min-height: https://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox/28639686#28639686
                  // 2. For the actual "> div" container with the content, we need to use normal pointer events so that clicking on it does not close the dialog.
                  css={css`
                    min-height: 0;
                    padding: ${uiKitDesignTokens.spacing20}
                      ${uiKitDesignTokens.spacing30};

                    > div {
                      display: flex;
                      flex-direction: column;
                      height: 100%;
                      pointer-events: auto;
                      min-height: 0;
                    }
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      align-items: stretch;
                      height: 100%;
                      min-height: 0;
                    `}
                  >
                    {props.children}
                  </div>
                </Card>
              </GridArea>
            </ClickableDialogContent>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
};

DialogContainer.displayName = 'DialogContainer';

export default DialogContainer;
