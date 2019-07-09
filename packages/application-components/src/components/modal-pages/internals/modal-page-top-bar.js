import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
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
    `}
  >
    <CloseIcon size="medium" {...props} />
  </span>
);
LargeCloseIcon.displayName = 'LargeCloseIcon';

const ModalPageTopBar = props => {
  const intl = useIntl();
  return (
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
              : intl.formatMessage(props.previousPathLabel)
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
          label={intl.formatMessage(messages.close)}
          onClick={props.onClose}
          icon={<LargeCloseIcon />}
        />
      )}
    </div>
  );
};
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
};
ModalPageTopBar.defaultProps = {
  color: 'surface',
  previousPathLabel: messages.back,
};

export default ModalPageTopBar;
