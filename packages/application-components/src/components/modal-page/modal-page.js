import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import {
  Spacings,
  Text,
  Card,
  SecondaryIconButton,
  CloseIcon,
} from '@commercetools-frontend/ui-kit';
import styles from './modal-page.mod.css';

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

const getZIndexForLevel = (baseZIndex, level) => {
  switch (level) {
    case 'two':
      return baseZIndex + 1;
    case 'three':
      return baseZIndex + 2;
    default:
      return baseZIndex;
  }
};

const getColumnSpacing = level => {
  const baseSpacing = 64;
  switch (level) {
    case 'two':
      return `${baseSpacing}px ${baseSpacing}px auto`;
    case 'three':
      return `${baseSpacing}px ${baseSpacing}px ${baseSpacing}px auto`;
    default:
      return `${baseSpacing}px auto`;
  }
};

const getStyles = props => ({
  overlay: {
    zIndex: props.zIndex || getZIndexForLevel(props.baseZIndex, props.level),
  },
  content: {
    gridTemplateColumns: getColumnSpacing(props.level),
  },
});

const Spacers = props => {
  switch (props.level) {
    case 'two':
      return (
        <React.Fragment>
          <div />
          <div />
        </React.Fragment>
      );
    case 'three':
      return (
        <React.Fragment>
          <div />
          <div />
          <div />
        </React.Fragment>
      );
    default:
      return <div />;
  }
};
Spacers.displayName = 'Spacers';
Spacers.propTypes = {
  level: PropTypes.oneOf(['one', 'two', 'three']).isRequired,
};

const ModalPage = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onClose}
    shouldCloseOnOverlayClick={Boolean(props.onClose)}
    shouldCloseOnEsc={Boolean(props.onClose)}
    overlayClassName={styles['modal-overlay']}
    className={styles['modal-content']}
    contentLabel={props.title}
    parentSelector={props.parentSelector || parentSelector}
    ariaHideApp={false}
    style={getStyles(props)}
  >
    <Spacers level={props.level} />
    <div className={styles['page-container']}>
      <Card className={styles['page-card']}>
        <Spacings.Stack scale="m">
          <div className={styles['page-header']}>
            <Spacings.Inline
              scale="m"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text.Headline
                elementType="h3"
                truncate={true}
                title={props.title}
              >
                {props.title}
              </Text.Headline>
              {props.onClose && (
                <SecondaryIconButton
                  label="Close page"
                  onClick={props.onClose}
                  icon={<CloseIcon size="medium" />}
                />
              )}
            </Spacings.Inline>
            <Spacings.Inline
              scale="m"
              alignItems="center"
              justifyContent="space-between"
            >
              {props.subtitle}
              <div>{props.components.actions}</div>
            </Spacings.Inline>
          </div>
          <div className={styles['page-content']}>{props.children}</div>
        </Spacings.Stack>
      </Card>
    </div>
  </Modal>
);
ModalPage.displayName = 'ModalPage';
ModalPage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  zIndex: PropTypes.number,
  baseZIndex: PropTypes.number,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  components: PropTypes.shape({
    actions: PropTypes.node,
  }),
  level: PropTypes.oneOf(['one', 'two', 'three']),
  children: PropTypes.node.isRequired,
  parentSelector: PropTypes.string,
};
ModalPage.defaultProps = {
  baseZIndex: 1000,
  components: {},
  level: 'one',
};

export default ModalPage;
