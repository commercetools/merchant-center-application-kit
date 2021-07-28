import { useSiteData, Link } from '@commercetools-docs/gatsby-theme-docs';
import { GithubSvgIcon } from '../../../icons';

const RepositoryLinks = () => {
  const siteData = useSiteData();
  return (
    <Link
      href={siteData.siteMetadata.repositoryUrl}
      title="Application Kit repository"
    >
      <GithubSvgIcon />
    </Link>
  );
};

export default RepositoryLinks;
