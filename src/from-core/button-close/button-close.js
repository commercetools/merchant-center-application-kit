import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, getDisplayName } from 'recompose';
import withMouseOverState from '@commercetools-local/ui-kit/hocs/with-mouse-over-state';
import { CloseIcon } from '@commercetools-local/ui-kit/icons';
import styles from './button-close.mod.css';

export const ButtonClose = props => (
  <div
    className={styles['button-close-container']}
    onMouseOver={props.handleMouseOver}
    onMouseOut={props.handleMouseOut}
    onClick={props.onClick}
    data-track-component="Close"
    data-track-event="click"
  >
    <CloseIcon size="small" theme={props.isMouseOver ? 'green' : 'black'} />
  </div>
);
ButtonClose.displayName = 'ButtonClose';
ButtonClose.propTypes = {
  onClick: PropTypes.func.isRequired,
  // HoC
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
};

export default compose(
  setDisplayName(getDisplayName(ButtonClose)),
  withMouseOverState
)(ButtonClose);
