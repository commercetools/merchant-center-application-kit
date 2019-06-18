import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { css, ClassNames } from '@emotion/core';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { injectIntl } from 'react-intl';
import {
  Text,
  CloseIcon,
  FlatButton,
  AngleLeftIcon,
  SecondaryIconButton,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import {
  getOverlayStyles,
  getContainerStyles,
  getAfterOpenOverlayAnimation,
  getAfterOpenContainerAnimation,
  getBeforeCloseOverlayAnimation,
  getBeforeCloseContainerAnimation,
} from './modal-page.styles';
import messages from './messages';

const TRANSITION_DURATION = 200;

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
    : document.querySelector(`#${PORTALS_CONTAINER_ID}`);

// Component to have a larger the clickable surface
const LargeCloseIcon = props => (
  <span
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: '';
        position: absolute;
        height: 35px;
        width: 48px;
        top: 0;
        right: 0;
      }
    `}
  >
    <CloseIcon size="medium" {...props} />
  </span>
);
LargeCloseIcon.displayName = 'LargeCloseIcon';

const ModalPageTopBar = injectIntl(props => (
  <div
    css={css`
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${customProperties.spacingS} ${customProperties.spacingM};
      background-color: ${props.color === 'neutral'
        ? customProperties.colorNeutral95
        : customProperties.colorSurface};
      border-bottom: 1px solid
        ${props.color === 'neutral'
          ? customProperties.colorSurface
          : customProperties.colorNeutral};
      & * + * {
        margin-left: ${customProperties.spacingS};
      }

      /* FIXME: these "dirty" styles should be removed when the new Breadcrumbs component is implemented */
      p {
        font-size: 12px !important;
      }

      /*  specific selector for the svg of the FlatButton */
      button > span > svg {
        height: 12px !important;
        width: 12px !important;
      }
    `}
  >
    <div
      css={css`
        display: flex;
        overflow: hidden;
      `}
    >
      <FlatButton
        tone="primary"
        label={
          typeof props.previousPathLabel === 'string'
            ? props.previousPathLabel
            : props.intl.formatMessage(props.previousPathLabel)
        }
        icon={<AngleLeftIcon size="medium" theme="green" />}
        onClick={props.onClose}
      />
      {props.currentPathLabel && (
        <React.Fragment>
          <Text.Detail isInline>/</Text.Detail>
          <Text.Detail title={props.currentPathLabel} isInline truncate>
            {props.currentPathLabel}
          </Text.Detail>
        </React.Fragment>
      )}
    </div>
    {props.onClose && (
      <SecondaryIconButton
        label={props.intl.formatMessage(messages.close)}
        onClick={props.onClose}
        icon={<LargeCloseIcon />}
      />
    )}
  </div>
));
ModalPageTopBar.displayName = 'ModalPageTopBar';
ModalPageTopBar.propTypes = {
  color: PropTypes.oneOf(['surface', 'neutral']),
  onClose: PropTypes.func.isRequired,
  currentPathLabel: PropTypes.string,
  previousPathLabel: PropTypes.oneOfType([
    PropTypes.string,
    // default intl message
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  // injected
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
};
ModalPageTopBar.defaultProps = {
  color: 'surface',
  previousPathLabel: messages.back,
};

const ModalPage = props => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);

  const delayedOnClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      props.onClose();
    }, TRANSITION_DURATION);
  };

  if (props.shouldDelayOnClose) {
    React.useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(delayedOnClose);
    };
  }, []);

  return (
    <ClassNames>
      {({ css: makeClassName }) => (
        <Modal
          isOpen={props.shouldDelayOnClose ? isOpen : props.isOpen}
          onRequestClose={
            props.shouldDelayOnClose ? delayedOnClose : props.onClose
          }
          shouldCloseOnOverlayClick={Boolean(props.onClose)}
          shouldCloseOnEsc={Boolean(props.onClose)}
          overlayClassName={{
            base: makeClassName(getOverlayStyles(props, TRANSITION_DURATION)),
            afterOpen: makeClassName(getAfterOpenOverlayAnimation()),
            beforeClose: makeClassName(getBeforeCloseOverlayAnimation()),
          }}
          className={{
            base: makeClassName(getContainerStyles(props, TRANSITION_DURATION)),
            afterOpen: makeClassName(getAfterOpenContainerAnimation()),
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
          <ModalPageTopBar
            color={props.topBarColor}
            onClose={props.shouldDelayOnClose ? delayedOnClose : props.onClose}
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
ModalPage.propTypes = {
  level: PropTypes.number,
  title: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  baseZIndex: PropTypes.number,
  getParentSelector: PropTypes.func,
  shouldDelayOnClose: PropTypes.bool,
  // TopBar props:
  topBarColor: PropTypes.oneOf(['surface', 'neutral']),
  currentPathLabel: PropTypes.string,
  previousPathLabel: PropTypes.oneOfType([
    PropTypes.string,
    // default intl message
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  // injected
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
};
ModalPage.defaultProps = {
  level: 1,
  baseZIndex: 1000,
  getParentSelector: getDefaultParentSelector,
  shouldDelayOnClose: true,
};

export default ModalPage;
