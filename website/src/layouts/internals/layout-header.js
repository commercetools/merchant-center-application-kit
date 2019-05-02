import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { customProperties, Spacings } from '@commercetools-frontend/ui-kit';
import * as colors from '../../colors';
import LogoSvg from '../../images/logo.svg';
import GitHubSvg from '../../images/github.svg';

const LayoutHeader = () => (
  <header
    css={css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${customProperties.spacingM};
      flex: 1;
      grid-row: 1;
      grid-column: 1/3;
      height: 50px;
      width: 90%;
      margin: 0 auto;
    `}
  >
    <Link
      to="/"
      css={css`
        color: ${colors.light.text};
        text-decoration: none;
        white-space: nowrap;
      `}
    >
      <Spacings.Inline scale="m" alignItems="center">
        <LogoSvg height={36} />
        <div
          css={css`
            font-size: 1.4rem;
          `}
        >
          {'App Kit'}
        </div>
      </Spacings.Inline>
    </Link>
    <Spacings.Inline alignItems="center">
      <a
        css={css`
          display: flex;
        `}
        href="https://github.com/commercetools/merchant-center-application-kit"
      >
        <GitHubSvg />
      </a>
      {/* Injected by React portal */}
      <div
        id="sidebar-menu-toggle"
        css={css`
          display: flex;
        `}
      />
    </Spacings.Inline>
  </header>
);
LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
