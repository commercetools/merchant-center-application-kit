import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import LogoSvg from '../../images/icons/logo.svg';
import { ExternalLink, Spacings } from '../../components';
import { colors, dimensions, typography } from '../../design-system';

const FooterExternalLink = styled(ExternalLink)`
  font-size: ${typography.fontSizes.small};
  color: ${colors.light.textPrimary} !important;
  text-decoration: none;
`;

const LayoutFooter = () => (
  <div
    css={css`
      grid-row: 3;
      grid-column: 1/3;
      background-color: ${colors.light.surfaceSecondary2};
      padding: ${dimensions.spacings.m};

      @media screen and (${dimensions.viewports.tablet}) {
        padding: ${dimensions.spacings.xl};
      }
    `}
  >
    <Spacings.Inline alignItems="center" justifyContent="space-between">
      <Spacings.Inline scale="m" alignItems="center">
        <LogoSvg height={32} />
        <div
          css={css`
            font-size: ${typography.fontSizes.small};
          `}
        >
          &copy;{` ${new Date().getFullYear()} commercetools`}
        </div>
      </Spacings.Inline>
      <div>
        <FooterExternalLink href="https://commercetools.com/privacy">
          {'Privacy Policy'}
        </FooterExternalLink>
        {` | `}
        <FooterExternalLink href="https://commercetools.com/privacy">
          {'Imprint'}
        </FooterExternalLink>
      </div>
    </Spacings.Inline>
  </div>
);

export default LayoutFooter;
