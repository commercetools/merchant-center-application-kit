import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { customProperties, Spacings } from '@commercetools-frontend/ui-kit';
import { colors, dimensions, typography } from '../../design-system';
import LogoSvg from '../../images/icons/logo.svg';

const LayoutHeader = () => (
  <header
    css={css`
      display: flex;
      align-items: center;
      flex: 1;
      grid-row: 1;
      grid-column: 1/4;
      height: ${dimensions.heights.header};
      width: 100%;
      padding: 0;
      margin: 0 auto;
      box-shadow: ${customProperties.shadow1};
      z-index: 1;

      > * + * {
        margin: 0 0 0 ${dimensions.spacings.m};
      }

      @media screen and (${dimensions.viewports.tablet}) {
        > * + * {
          margin: 0 0 0 ${dimensions.spacings.xl};
        }
      }
    `}
  >
    <div
      css={css`
        border-right: 1px solid ${colors.light.borderPrimary};
        width: auto;
        height: 100%;

        @media screen and (${dimensions.viewports.mobile}) {
          display: flex;
        }
        @media screen and (${dimensions.viewports.tablet}) {
          width: ${dimensions.widths.pageNavigation};
        }
      `}
    >
      {/* Injected by React portal */}
      <div
        id="sidebar-menu-toggle"
        css={css`
          display: flex;
        `}
      />
      <div
        css={css`
          margin: 0 ${dimensions.spacings.m};
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <Link
          to="/"
          css={css`
            color: ${colors.light.textPrimary};
            text-decoration: none;
            white-space: nowrap;
          `}
        >
          <Spacings.Inline scale="s" alignItems="center">
            <LogoSvg height={32} />
            <div
              css={css`
                display: none;
                font-size: ${typography.fontSizes.h4};

                @media screen and (${dimensions.viewports.tablet}) {
                  display: block;
                }
              `}
            >
              {'Documentation'}
            </div>
          </Spacings.Inline>
        </Link>
      </div>
    </div>
    <div
      css={css`
        color: ${colors.light.textSecondary};
        font-size: ${typography.fontSizes.body};
      `}
    >
      {'AppKit'}
    </div>
  </header>
);

export default LayoutHeader;
