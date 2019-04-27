import React from 'react';
import PropTypes from 'prop-types';
import {
  CloseIcon,
  SecondaryIconButton,
  Text,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import { css } from '@emotion/core';

const DialogHeader = props => (
  <div
    css={css`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
    `}
  >
    <Spacings.Inline
      scale="m"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text.Subheadline elementType="h4" truncate={true} title={props.title}>
        {props.title}
      </Text.Subheadline>
      {props.onClose && (
        <SecondaryIconButton
          label="Close dialog"
          onClick={props.onClose}
          icon={<CloseIcon size="medium" />}
        />
      )}
    </Spacings.Inline>
  </div>
);
DialogHeader.displayName = 'DialogHeader';
DialogHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default DialogHeader;
