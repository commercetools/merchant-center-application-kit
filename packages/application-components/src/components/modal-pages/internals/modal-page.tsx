import type { CSSObject } from '@emotion/react';

import {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Modal from 'react-modal';
import { ClassNames } from '@emotion/react';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import {
  TRANSITION_DURATION,
  getOverlayStyles,
  getContainerStyles,
  getAfterOpenOverlayAnimation,
  getAfterOpenContainerAnimation,
  getBeforeCloseOverlayAnimation,
  getBeforeCloseContainerAnimation,
} from './modal-page.styles';
import PageTopBar from './modal-page-top-bar';

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
type Props = {
  level: number;
  title: string;
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  children: ReactNode;
  zIndex?: number;
  baseZIndex: number;
  getParentSelector: typeof getDefaultParentSelector;
  shouldDelayOnClose: boolean;
  afterOpenStyles?: string | CSSObject;
  // TopBar props:
  topBarColor?: 'surface' | 'neutral';
  currentPathLabel?: string;
  previousPathLabel?: Label;
};
const defaultProps: Pick<
  Props,
  'level' | 'baseZIndex' | 'getParentSelector' | 'shouldDelayOnClose'
> = {
  level: 1,
  baseZIndex: 1000,
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
          <PageTopBar
            color={props.topBarColor}
            onClose={handleClose}
            currentPathLabel={props.currentPathLabel}
            previousPathLabel={props.previousPathLabel}
          />
          {props.children}
        </Modal>
      )}
    </ClassNames>
  );
};
ModalPage.displayName = 'ModalPage';
ModalPage.defaultProps = defaultProps;

export default ModalPage;
