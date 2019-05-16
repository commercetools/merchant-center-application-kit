import React from 'react';
import PropTypes from 'prop-types';
import {
  customProperties,
  Text,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import { css } from '@emotion/core';

const ModalPageHeader = props => (
  <div
    css={css`
      margin: 0 ${customProperties.spacingM};
      padding: ${customProperties.spacingM} 0;
      border-bottom: 1px solid #afafaf;
    `}
  >
    <Spacings.Inline justifyContent="space-between" alignItems="flex-end">
      <Spacings.Stack>
        <Text.Subheadline elementType="h4">{props.title}</Text.Subheadline>
        {typeof props.subtitle === 'string' ? (
          <Text.Body>{props.subtitle}</Text.Body>
        ) : (
          props.subtitle
        )}
      </Spacings.Stack>
      <div>{props.actions}</div>
    </Spacings.Inline>
  </div>
);
ModalPageHeader.displayName = 'ModalPageHeader';
ModalPageHeader.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default ModalPageHeader;
