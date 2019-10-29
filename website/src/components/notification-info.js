import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import UnstyledInformationIcon from '../images/icons/information-icon.svg';
import { colors, dimensions, typography, tokens } from '../design-system';
import createStyledIcon from '../utils/create-styled-icon';
import Spacings from './spacings';

const InformationIcon = createStyledIcon(UnstyledInformationIcon);

const Flag = props => (
  <span
    css={css`
      background-color: ${colors.light.surfaceInfo};
      border: 1px solid ${colors.light.borderInfo};
      border-radius: ${tokens.borderRadius4};
      color: ${colors.light.textInfo};
      font-size: ${typography.fontSizes.small};
      padding: 0 ${dimensions.spacings.xs};
    `}
  >
    {props.children}
  </span>
);
Flag.propTypes = {
  children: PropTypes.string.isRequired,
};

const NotificationInfo = props => (
  <div
    css={css`
      margin: 0 0 ${dimensions.spacings.m};
      background-color: ${colors.light.surfaceInfo};
      border: 1px solid ${colors.light.borderInfo};
      border-radius: ${tokens.borderRadius6};
      padding: ${dimensions.spacings.m};
    `}
  >
    <Spacings.Inline scale="s" alignItems="flex-start">
      <div>
        <InformationIcon color="info" />
      </div>
      <Spacings.Stack>
        <Spacings.Inline>
          <Flag>{props.flag.toUpperCase()}</Flag>
        </Spacings.Inline>
        <div>
          {
            'This feature is in a pre-release state and might change or have limited support. Use with caution for production.'
          }
        </div>
      </Spacings.Stack>
    </Spacings.Inline>
  </div>
);
NotificationInfo.displayName = 'NotificationInfo';
NotificationInfo.propTypes = {
  flag: PropTypes.oneOf(['alpha', 'beta']),
};

export default NotificationInfo;
