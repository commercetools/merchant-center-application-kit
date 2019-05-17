import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import {
  ContentNotification,
  Spacings,
  Text,
  customProperties,
} from '@commercetools-frontend/ui-kit';

const NotificationFeature = props => (
  <div
    css={css`
      margin-bottom: ${customProperties.spacingM};
    `}
  >
    <ContentNotification type="info">
      <Spacings.Stack>
        <Text.Detail isBold={true}>{props.flag.toUpperCase()}</Text.Detail>
        <Text.Detail>
          This feature is in a pre-release state and might change or have
          limited support. Use with caution for production.
        </Text.Detail>
      </Spacings.Stack>
    </ContentNotification>
  </div>
);
NotificationFeature.displayName = 'NotificationFeature';
NotificationFeature.propTypes = {
  flag: PropTypes.oneOf(['alpha', 'beta']),
};

export default NotificationFeature;
