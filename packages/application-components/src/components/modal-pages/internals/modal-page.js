import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { ClassNames } from '@emotion/core';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import {
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
    : document.querySelector(`#${PORTALS_CONTAINER_ID}`);

const ModalPage = props => (
  <ClassNames>
    {({ css: makeClassName }) => (
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        shouldCloseOnOverlayClick={Boolean(props.onClose)}
        shouldCloseOnEsc={Boolean(props.onClose)}
        overlayClassName={{
          base: makeClassName(getOverlayStyles(props)),
          afterOpen: makeClassName(getAfterOpenOverlayAnimation()),
          beforeClose: makeClassName(getBeforeCloseOverlayAnimation()),
        }}
        className={{
          base: makeClassName(getContainerStyles(props)),
          afterOpen: makeClassName(getAfterOpenContainerAnimation()),
          beforeClose: makeClassName(getBeforeCloseContainerAnimation()),
        }}
        contentLabel={props.title}
        parentSelector={props.getParentSelector}
        ariaHideApp={false}
        // Adjust this value if the (beforeClose) animation duration is changed
        closeTimeoutMS={200}
        style={{
          // stylelint-disable-next-line selector-type-no-unknown
          overlay: {
            zIndex: props.zIndex,
          },
        }}
      >
        {props.children}
      </Modal>
    )}
  </ClassNames>
);
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
};
ModalPage.defaultProps = {
  level: 1,
  baseZIndex: 1000,
  getParentSelector: getDefaultParentSelector,
};

export default ModalPage;
