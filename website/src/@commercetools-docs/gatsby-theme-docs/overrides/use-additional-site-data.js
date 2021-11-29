import { useStaticQuery, graphql } from 'gatsby';

const useAdditionalSiteData = () => {
  const data = useStaticQuery(graphql`
    query GetAdditionalSiteData {
      site {
        siteMetadata {
          repositoryUrl
          legacyDocs
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useAdditionalSiteData;
