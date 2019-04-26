/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import favicon from '@commercetools-frontend/assets/html-page/favicon.png';
import faviconS from '@commercetools-frontend/assets/html-page/favicon_57x57px.png';
import faviconM from '@commercetools-frontend/assets/html-page/favicon_72x72px.png';
import faviconL from '@commercetools-frontend/assets/html-page/favicon_144x144px.png';

const SEO = ({ description, lang, meta, keywords, title }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || data.site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: data.site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
      link={[
        { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
        { rel: 'apple-touch-icon', sizes: '57x57', href: `${faviconS}` },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '57x57',
          href: `${faviconS}`,
        },
        { rel: 'apple-touch-icon', sizes: '72x72', href: `${faviconM}` },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '72x72',
          href: `${faviconM}`,
        },
        { rel: 'apple-touch-icon', sizes: '144x144', href: `${faviconL}` },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '144x144',
          href: `${faviconL}`,
        },
      ]}
    />
  );
};
SEO.displayName = 'SEO';
SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
};
SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
