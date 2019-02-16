import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CloseIcon,
  Constraints,
  SecondaryIconButton,
  Spacings,
  Text,
} from '@commercetools-frontend/ui-kit';
import ModalContainer from '../modal-container';
import styles from './info-dialog.mod.css';

// Like "Spacings.Inline", but with the `justify-content: space-between` style
const Stretched = props => (
  <div className={styles.stretched}>{props.children}</div>
);
Stretched.displayName = 'Stretched';
Stretched.propTypes = { children: PropTypes.node.isRequired };

const InfoDialog = props => (
  <ModalContainer
    isOpen={props.isOpen}
    onRequestClose={props.onClose}
    overlayClassName={styles['modal-overlay']}
    className={styles['modal-content']}
    contentLabel="info-dialog"
  >
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Card>
        <Spacings.Stack scale="m">
          <Stretched>
            <Text.Subheadline
              elementType="h4"
              truncate={true}
              title={props.title}
            >
              {props.title}
            </Text.Subheadline>
            <SecondaryIconButton
              label="Close dialog"
              onClick={props.onClose}
              icon={<CloseIcon size="medium" />}
            />
          </Stretched>
          <div className={styles.content}>{props.children}</div>
        </Spacings.Stack>
      </Card>
    </Constraints.Horizontal>
  </ModalContainer>
);
InfoDialog.displayName = 'InfoDialog';
InfoDialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  horizontalConstraint: PropTypes.oneOf(['m', 'l']),
  // React modal props
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
InfoDialog.defaultProps = {
  horizontalConstraint: 'm',
};

export default InfoDialog;
