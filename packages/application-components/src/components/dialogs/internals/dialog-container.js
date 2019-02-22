import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { Card, Spacings } from '@commercetools-frontend/ui-kit';
import styles from './dialog-styles.mod.css';

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
const parentSelector = () =>
  process.env.NODE_ENV === 'test'
    ? document.body
    : document.querySelector(`#${PORTALS_CONTAINER_ID}`);

const DialogContainer = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onClose}
    shouldCloseOnOverlayClick={Boolean(props.onClose)}
    shouldCloseOnEsc={Boolean(props.onClose)}
    overlayClassName={styles['modal-overlay']}
    className={styles['modal-content']}
    contentLabel="info-dialog"
    parentSelector={parentSelector}
    ariaHideApp={false}
    style={{
      overlay: {
        zIndex: props.zIndex,
      },
    }}
  >
    <div className={styles[`size-${props.size}`]}>
      <div className={styles['dialog-container']}>
        <Card>
          <Spacings.Stack scale="m">{props.children}</Spacings.Stack>
        </Card>
      </div>
    </div>
  </Modal>
);
DialogContainer.displayName = 'DialogContainer';
DialogContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['m', 'l', 'scale']),
  zIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
};
DialogContainer.defaultProps = {
  size: 'l',
  zIndex: 1000,
};

export default DialogContainer;
