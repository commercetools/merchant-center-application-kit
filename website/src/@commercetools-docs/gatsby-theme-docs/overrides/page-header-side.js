import { useSiteData, Link } from '@commercetools-docs/gatsby-theme-docs';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { GithubSvgIcon } from '../../../icons';

const RepositoryLinks = () => {
  const siteData = useSiteData();
  return (
    <SpacingsStack>
      <div>
        <Link
          href={siteData.siteMetadata.repositoryUrl}
          title="Application Kit repository"
        >
          <GithubSvgIcon />
        </Link>
      </div>
      <div>
        <Link href={siteData.siteMetadata.legacyDocs} title="Go to legacy docs">
          Go to legacy docs
        </Link>
      </div>
    </SpacingsStack>
  );
};

export default RepositoryLinks;
