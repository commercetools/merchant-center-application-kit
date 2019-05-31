import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { injectIntl } from 'react-intl';
import {
  Text,
  CloseIcon,
  FlatButton,
  AngleLeftIcon,
  SecondaryIconButton,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import messages from './messages';

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
    }`}
  >
    <CloseIcon size="medium" {...props} />
  </span>
);
LargeCloseIcon.displayName = 'LargeCloseIcon';

const ModalPageTopBar = props => (
  <div
    css={css`
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${customProperties.spacingS} ${customProperties.spacingM};
      background-color: ${props.color === 'gray'
        ? customProperties.colorGray95
        : customProperties.colorWhite};
      border-bottom: 1px solid
        ${props.color === 'gray'
          ? customProperties.colorWhite
          : customProperties.colorGray};
      & * + * {
        margin-left: ${customProperties.spacingS};
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
        <Text.Detail title={props.currentPathLabel} isInline truncate>
          {`/ ${props.currentPathLabel}`}
        </Text.Detail>
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
);
ModalPageTopBar.displayName = 'ModalPageTopBar';
ModalPageTopBar.propTypes = {
  color: PropTypes.oneOf(['white', 'gray']),
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
  color: 'white',
  previousPathLabel: messages.back,
};
ModalPageTopBar.Intl = messages;

export default injectIntl(ModalPageTopBar);
