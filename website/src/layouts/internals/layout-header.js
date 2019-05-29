import React from 'react';
import { css } from '@emotion/core';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { customProperties, Spacings } from '@commercetools-frontend/ui-kit';
import * as colors from '../../colors';
import { ExternalLink } from '../../components';
import LogoSvg from '../../images/logo.svg';
import GitHubSvg from '../../images/github.svg';

const LayoutHeader = () => {
  const data = useStaticQuery(graphql`
    query GetCurrentVersion {
      site {
        siteMetadata {
          currentVersion
          repositoryUrl
        }
      }
    }
  `);
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 ${customProperties.spacingM};
        flex: 1;
        grid-row: 1;
        grid-column: 1/4;
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
        <Spacings.Inline alignItems="center" scale="l">
          <ExternalLink
            href={`${data.site.siteMetadata.repositoryUrl}/releases/tag/v${
              data.site.siteMetadata.currentVersion
            }`}
          >
            {`v${data.site.siteMetadata.currentVersion}`}
          </ExternalLink>
          <ExternalLink href={data.site.siteMetadata.repositoryUrl}>
            <GitHubSvg />
          </ExternalLink>
        </Spacings.Inline>
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
};
LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
