import {
  type ReactNode,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ClassNames, type CSSObject } from '@emotion/react';
import Modal, { type Props as ModalProps } from 'react-modal';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import CustomViewsSelector from '../../custom-views/custom-views-selector';
import ModalPageTopBar from './modal-page-top-bar';
import {
  TRANSITION_DURATION,
  getOverlayStyles,
  getContainerStyles,
  getAfterOpenOverlayAnimation,
  getAfterOpenContainerAnimation,
  getBeforeCloseOverlayAnimation,
  getBeforeCloseContainerAnimation,
} from './modal-page.styles';

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

const getOverlayElement: ModalProps['overlayElement'] = (
  props,
  contentElement
) => (
  // Assign the `data-role` to the overlay container, which is used as
  // the CSS selector in the `<PortalsContainer>`.
  <div {...props} data-role="modal-overlay">
    {contentElement}
  </div>
);

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
  /**
   * This code is used to configure which Custom Views are available for this page.
   */
  customViewLocatorCode?: string;
  onClose?: (event: SyntheticEvent) => void;
  children: ReactNode;
  zIndex?: number;
  /**
   * @deprecated Not used anymore, as the value is controlled via the Stacking Layer System.
   */
  baseZIndex?: number;
  getParentSelector: typeof getDefaultParentSelector;
  shouldDelayOnClose: boolean;
  afterOpenStyles?: string | CSSObject;
  // TopBar props:
  topBarColor?: 'surface' | 'neutral';
  currentPathLabel?: string;
  previousPathLabel?: Label;
  hidePathLabel?: boolean;
  size?: TModalPageSize;
  hideTopBar?: boolean;
};
const defaultProps: Pick<
  Props,
  'getParentSelector' | 'shouldDelayOnClose' | 'size'
> = {
  size: 'scale',
  getParentSelector: getDefaultParentSelector,
  shouldDelayOnClose: true,
};

const ModalPage = (props: Props) => {
  const [forceClose, setForceClose] = useState(false);
  const closingTimer = useRef<NodeJS.Timeout>();
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
    (event) => {
      if (props.shouldDelayOnClose) {
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
    [onClose, props.shouldDelayOnClose]
  );
  return (
    <ClassNames>
      {({ css: makeClassName }) => (
        <Modal
          isOpen={forceClose === true ? false : props.isOpen}
          onRequestClose={handleClose}
          shouldCloseOnOverlayClick={Boolean(props.onClose)}
          shouldCloseOnEsc={Boolean(props.onClose)}
          overlayElement={getOverlayElement}
          overlayClassName={{
            base: makeClassName(getOverlayStyles(props)),
            afterOpen: makeClassName(getAfterOpenOverlayAnimation()),
            beforeClose: makeClassName(getBeforeCloseOverlayAnimation()),
          }}
          className={{
            base: makeClassName(getContainerStyles(props)),
            afterOpen:
              typeof props.afterOpenStyles === 'string'
                ? props.afterOpenStyles
                : makeClassName(
                    props.afterOpenStyles ?? getAfterOpenContainerAnimation()
                  ),
            beforeClose: makeClassName(getBeforeCloseContainerAnimation()),
          }}
          contentLabel={props.title}
          parentSelector={props.getParentSelector}
          ariaHideApp={false}
          // Adjust this value if the (beforeClose) animation duration is changed
          closeTimeoutMS={TRANSITION_DURATION}
          style={{
            // stylelint-disable-next-line selector-type-no-unknown
            overlay: {
              zIndex: props.zIndex,
            },
          }}
        >
          <CustomViewsSelector
            customViewLocatorCode={props.customViewLocatorCode}
          />
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
        </Modal>
      )}
    </ClassNames>
  );
};
ModalPage.displayName = 'ModalPage';
ModalPage.defaultProps = defaultProps;

export default ModalPage;
