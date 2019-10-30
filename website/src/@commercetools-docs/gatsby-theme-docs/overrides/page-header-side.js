import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import {
  ExternalLink,
  Spacings,
} from '@commercetools-docs/gatsby-theme-docs/src/components';
import { dimensions } from '@commercetools-docs/gatsby-theme-docs/src/design-system';
import GitHubSvg from '../../../images/icons/github.svg';

const RepositoryLinks = () => {
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
    <div
      css={css`
        padding: ${dimensions.spacings.m};
      `}
    >
      <Spacings.Inline scale="l" alignItems="center" justifyContent="flex-end">
        <ExternalLink
          href={`${data.site.siteMetadata.repositoryUrl}/releases/tag/v${data.site.siteMetadata.currentVersion}`}
          css={css`
            text-decoration: none;
            :hover {
              text-decoration: underline;
            }
          `}
        >
          {`v${data.site.siteMetadata.currentVersion}`}
        </ExternalLink>
        <ExternalLink href={data.site.siteMetadata.repositoryUrl}>
          <GitHubSvg />
        </ExternalLink>
      </Spacings.Inline>
    </div>
  );
};

export default RepositoryLinks;
