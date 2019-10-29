import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { Spacings } from '../../components';
import { colors, dimensions, typography, tokens } from '../../design-system';
import LogoSvg from '../../images/icons/logo.svg';

const LayoutHeader = props => (
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
      box-shadow: ${tokens.shadow1};
      z-index: 10;

      > * + * {
        margin: 0 0 0 ${dimensions.spacings.m};
      }

      @media screen and (${dimensions.viewports.desktop}) {
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
        display: flex;

        @media screen and (${dimensions.viewports.desktop}) {
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
          <Spacings.Inline scale="m" alignItems="center">
            <LogoSvg height={32} />
            <div
              css={css`
                display: none;
                font-size: ${typography.fontSizes.h4};

                @media screen and (${dimensions.viewports.desktop}) {
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
      {props.siteTitle}
    </div>
  </header>
);
LayoutHeader.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default LayoutHeader;
