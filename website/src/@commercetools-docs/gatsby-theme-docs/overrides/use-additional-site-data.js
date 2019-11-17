import { useStaticQuery, graphql } from 'gatsby';

const useAdditionalSiteData = () => {
  const data = useStaticQuery(graphql`
    query GetAdditionalSiteData {
      site {
        siteMetadata {
          currentVersion
          repositoryUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useAdditionalSiteData;
