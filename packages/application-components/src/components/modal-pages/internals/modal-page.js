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
import ModalPageTopBar from './modal-page-top-bar';

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

class ModalPage extends React.Component {
  static displayName = 'ModalPage';
  static propTypes = {
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
  static defaultProps = {
    level: 1,
    baseZIndex: 1000,
    getParentSelector: getDefaultParentSelector,
    shouldDelayOnClose: true,
  };
  static getDerivedStateFromProps(props) {
    return { isOpen: props.isOpen };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.shouldDelayOnClose &&
      prevProps.isOpen !== this.props.isOpen
    ) {
      this.setState({ isOpen: this.props.isOpen });
    }
  }

  componentWillUnmount() {
    if (this.closingTimer) {
      clearTimeout(this.closingTimer);
    }
  }

  handleClose = () => {
    if (this.props.shouldDelayOnClose) {
      this.setState({ isOpen: false });
      this.closingTimer = setTimeout(() => {
        this.props.onClose();
      }, TRANSITION_DURATION);
      return;
    }
    this.props.onClose();
  };

  render() {
    return (
      <ClassNames>
        {({ css: makeClassName }) => (
          <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.handleClose}
            shouldCloseOnOverlayClick={Boolean(this.props.onClose)}
            shouldCloseOnEsc={Boolean(this.props.onClose)}
            overlayClassName={{
              base: makeClassName(
                getOverlayStyles(this.props, TRANSITION_DURATION)
              ),
              afterOpen: makeClassName(getAfterOpenOverlayAnimation()),
              beforeClose: makeClassName(getBeforeCloseOverlayAnimation()),
            }}
            className={{
              base: makeClassName(
                getContainerStyles(this.props, TRANSITION_DURATION)
              ),
              afterOpen: makeClassName(getAfterOpenContainerAnimation()),
              beforeClose: makeClassName(getBeforeCloseContainerAnimation()),
            }}
            contentLabel={this.props.title}
            parentSelector={this.props.getParentSelector}
            ariaHideApp={false}
            // Adjust this value if the (beforeClose) animation duration is changed
            closeTimeoutMS={TRANSITION_DURATION}
            style={{
              // stylelint-disable-next-line selector-type-no-unknown
              overlay: {
                zIndex: this.props.zIndex,
              },
            }}
          >
            <ModalPageTopBar
              color={this.props.topBarColor}
              onClose={this.handleClose}
              currentPathLabel={this.props.currentPathLabel}
              previousPathLabel={this.props.previousPathLabel}
            />
            {this.props.children}
          </Modal>
        )}
      </ClassNames>
    );
  }
}

export default ModalPage;
