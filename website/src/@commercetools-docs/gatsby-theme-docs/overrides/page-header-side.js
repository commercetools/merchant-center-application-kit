import React from 'react';
import { css } from '@emotion/react';
import { useSiteData, Link } from '@commercetools-docs/gatsby-theme-docs';
import { designSystem } from '@commercetools-docs/ui-kit';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import GitHubSvg from '../../../icons/github.svg';

const RepositoryLinks = () => {
  const siteData = useSiteData();
  return (
    <div
      css={css`
        margin: ${designSystem.dimensions.spacings.m} 0;
        padding: 0 ${designSystem.dimensions.spacings.m};
        border-left: 1px solid ${designSystem.colors.light.borderPrimary};
      `}
    >
      <SpacingsInline scale="l" alignItems="center" justifyContent="flex-start">
        <Link
          href={siteData.siteMetadata.repositoryUrl}
          title="Application Kit repository"
        >
          <GitHubSvg />
        </Link>
      </SpacingsInline>
    </div>
  );
};

export default RepositoryLinks;
