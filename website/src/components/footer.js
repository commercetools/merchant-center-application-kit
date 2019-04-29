import React from 'react';
import { css } from '@emotion/core';
import { Spacings, customProperties } from '@commercetools-frontend/ui-kit';
import * as colors from '../colors';

const Footer = () => (
  <div
    css={css`
      background-color: ${colors.light.cards};
      padding: ${customProperties.spacingXl};
    `}
  >
    <div
      css={css`
        width: 90%;
        margin: 0 auto;
      `}
    >
      <Spacings.Stack scale="l">
        <Spacings.Inline alignItems="center" justifyContent="space-around">
          <Spacings.Stack scale="m">
            <div>{'Documentation'}</div>
          </Spacings.Stack>
          <Spacings.Stack scale="m">
            <div>{'Resources'}</div>
          </Spacings.Stack>
        </Spacings.Inline>
        <div
          css={css`
            text-align: center;
            color: ${colors.light.text};
          `}
        >
          {'copyright'} &copy;{' '}
          {`${new Date().getFullYear()} commercetools GmbH`}
        </div>
      </Spacings.Stack>
    </div>
  </div>
);
Footer.displayName = 'Footer';

export default Footer;
