import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import { colors, dimensions, typography, tokens } from '../design-system';

const Card = props => (
  <div
    css={[
      css`
        display: flex;
        font-size: ${typography.fontSizes.body};
        flex-direction: column;
        width: 100%;
        box-shadow: ${props.type === 'raised' ? tokens.shadow1 : 'none'};
        border-radius: ${tokens.borderRadius6};
        background: ${props.theme === 'dark'
          ? colors.light.surfaceSecondary1
          : colors.light.surfacePrimary};
      `,
    ]}
    className={props.className}
  >
    <div
      css={css`
        padding: ${dimensions.spacings.m};
      `}
    >
      {props.children}
    </div>
  </div>
);

Card.displayName = 'Card';
Card.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['raised', 'flat']),
  children: PropTypes.any,
  theme: PropTypes.oneOf(['light', 'dark']),
};

Card.defaultProps = {
  type: 'raised',
  theme: 'light',
};

export default Card;
