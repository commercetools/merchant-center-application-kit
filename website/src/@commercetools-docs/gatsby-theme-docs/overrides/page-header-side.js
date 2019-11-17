import React from 'react';
import { css } from '@emotion/core';
import {
  designSystem,
  Spacings,
  Markdown,
  useSiteData,
} from '@commercetools-docs/gatsby-theme-docs';
import GitHubSvg from '../../../icons/github.svg';

const RepositoryLinks = () => {
  const siteData = useSiteData();
  return (
    <div
      css={css`
        padding: ${designSystem.dimensions.spacings.m};
      `}
    >
      <Spacings.Inline scale="l" alignItems="center" justifyContent="flex-end">
        <Markdown.Link
          href={`${siteData.siteMetadata.repositoryUrl}/releases/tag/v${siteData.siteMetadata.currentVersion}`}
          css={css`
            text-decoration: none;
            :hover {
              text-decoration: underline;
            }
          `}
        >
          {`v${siteData.siteMetadata.currentVersion}`}
        </Markdown.Link>
        <Markdown.Link href={siteData.siteMetadata.repositoryUrl}>
          <GitHubSvg />
        </Markdown.Link>
      </Spacings.Inline>
    </div>
  );
};

export default RepositoryLinks;
