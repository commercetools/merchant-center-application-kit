import {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type SyntheticEvent,
  useState,
} from 'react';
import type { CSSObject } from '@emotion/react';
import {
  Root as DialogRoot,
  Portal as DialogPortal,
  Title as DialogTitle,
  type DialogProps,
} from '@radix-ui/react-dialog';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { ModalPageTopBar } from '../utils';
import { stylesBySize, ModalContent, ModalOverlay } from './modal-page.styles';

const HiddenEmptyDialogTitle = () => (
  <div aria-hidden={true} style={{ display: 'none' }}>
    <DialogTitle />
  </div>
);

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

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;
export type TModalPageSize = 10 | 20 | 30 | 'scale';

type Props = {
  /**
   * @deprecated Not used anymore, as the value is controlled via the Stacking Layer System.
   */
  level?: number;
  title: string;
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  children: ReactNode;
  zIndex?: number;
  /**
   * @deprecated Not used anymore, as the value is controlled via the Stacking Layer System.
   */
  baseZIndex?: number;
  getParentSelector?: typeof getDefaultParentSelector;
  shouldDelayOnClose?: boolean;
  afterOpenStyles?: string | CSSObject;
  // TopBar props:
  topBarColor?: 'surface' | 'neutral';
  currentPathLabel?: string;
  previousPathLabel?: Label;
  hidePathLabel?: boolean;
  size?: TModalPageSize;
  hideTopBar?: boolean;
};

const ModalPage = ({
  size = 'scale',
  getParentSelector = getDefaultParentSelector,
  shouldDelayOnClose = true,
  ...props
}: Props) => {
  const [forceClose, setForceClose] = useState(false);

  const closingTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const TRANSITION_DURATION = stylesBySize[size].transitionTime;

  useEffect(() => {
    if (props.isOpen === true) setForceClose(false);
    return () => {
      if (closingTimer.current) {
        clearTimeout(closingTimer.current);
      }
    };
  }, [props.isOpen]);

  const { onClose } = props;

  const handleClose = useCallback(
    (event: SyntheticEvent) => {
      if (shouldDelayOnClose) {
        // In this case we want the closing animation to be shown
        // and therefore we need wait for it to be completed
        // before calling `onClose`.
        setForceClose(true);
        closingTimer.current = setTimeout(() => {
          onClose && onClose(event);
        }, TRANSITION_DURATION);
        return;
      }
      onClose && onClose(event);
    },
    [onClose, shouldDelayOnClose, TRANSITION_DURATION]
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

  return (
    <DialogRoot
      open={props.isOpen && !forceClose}
      onOpenChange={handleClose as unknown as DialogProps['onOpenChange']}
      modal={false} // `true` would apply aria-hidden to all other elements when the modal is open
    >
      <DialogPortal container={portalContainer}>
        <div
          // Assign the `data-role` to the overlay container, which is used as
          // the CSS selector in the `<PortalsContainer>`.
          data-role="modal-overlay"
        >
          <ModalOverlay
            size={size}
            data-role="modal-overlay-clickable"
            onClick={handleClose}
          />
          <ModalContent
            size={size}
            aria-describedby={undefined}
            onInteractOutside={(e) => {
              // Prevent only the modal from closing, handle all other events
              const overlay = document.querySelector(
                '[data-role="modal-overlay-clickable"]'
              );
              if (!overlay?.contains(e.target as Node)) {
                e.preventDefault();
              }
            }}
            aria-labelledby={undefined}
            aria-label={props.title}
            id={undefined}
          >
            {/* FIXME: Temporary workaround for https://github.com/radix-ui/primitives/issues/2986
              Radix UI's DialogContent requires rendering a DialogTitle, which renders as <h2>.
              To meet this requirement and avoid rendering two heading elements with the title in the DOM (<TextTitle> renders as <h3>), we are hiding the DialogTitle.
            */}
            <HiddenEmptyDialogTitle />
            {!props.hideTopBar && (
              <ModalPageTopBar
                color={props.topBarColor}
                onClose={handleClose}
                currentPathLabel={props.currentPathLabel}
                previousPathLabel={props.previousPathLabel}
                hidePathLabel={props.hidePathLabel}
              />
            )}
            {props.children}
          </ModalContent>
        </div>
      </DialogPortal>
    </DialogRoot>
  );
};
ModalPage.displayName = 'ModalPage';

export default ModalPage;
