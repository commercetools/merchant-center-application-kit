import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  CloseIcon,
  Spacings,
  FlatButton,
  AngleLeftIcon,
  SecondaryIconButton,
} from '@commercetools-frontend/ui-kit';
import { getTopBarStyles } from './modal-page.styles';

const ModalPageTopBar = props => (
  <div css={getTopBarStyles(props)}>
    <Spacings.Inline>
      <FlatButton
        tone="primary"
        label={props.previousPath || ''}
        icon={<AngleLeftIcon size="medium" theme="green" />}
        onClick={props.onClose}
      />
      {props.currentPath && (
        <span>
          <Text.Body>{`/ ${props.currentPath}`}</Text.Body>
        </span>
      )}
    </Spacings.Inline>
    {props.onClose && (
      <SecondaryIconButton
        label="Close Modal Page"
        onClick={props.onClose}
        icon={<CloseIcon size="medium" />}
      />
    )}
  </div>
);
ModalPageTopBar.displayName = 'ModalPageTopBar';
ModalPageTopBar.propTypes = {
  tone: PropTypes.oneOf(['white', 'gray']),
  onClose: PropTypes.func,
  currentPath: PropTypes.string,
  previousPath: PropTypes.string,
};
ModalPageTopBar.defaultProps = {
  tone: 'white',
};

export default ModalPageTopBar;
