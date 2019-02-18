import React from 'react';
import PropTypes from 'prop-types';
import {
  CloseIcon,
  SecondaryIconButton,
  Text,
} from '@commercetools-frontend/ui-kit';
import styles from './dialog-styles.mod.css';

const DialogHeader = props => (
  <div className={styles.stretched}>
    <Text.Subheadline elementType="h4" truncate={true} title={props.title}>
      {props.title}
    </Text.Subheadline>
    <SecondaryIconButton
      label="Close dialog"
      onClick={props.onClose}
      icon={<CloseIcon size="medium" />}
    />
  </div>
);
DialogHeader.displayName = 'DialogHeader';
DialogHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogHeader;
