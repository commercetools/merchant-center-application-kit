/* eslint-disable global-require */

module.exports = {
  siteMetadata: {
    title: `Merchant Center Application Kit`,
    description: ``,
    author: `commercetools`,
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
    currentVersion: require('../lerna.json').version,
    navbarLinks: [
      {
        label: 'Getting started',
        subgroup: [
          { label: 'Introduction', linkTo: '/getting-started/introduction' },
          { label: 'Development', linkTo: '/getting-started/development' },
          { label: 'Deployment', linkTo: '/getting-started/deployment' },
          { label: 'Registration', linkTo: '/getting-started/registration' },
          { label: 'Usage', linkTo: '/getting-started/usage' },
          { label: 'Installation', linkTo: '/getting-started/installation' },
        ],
      },
      {
        label: 'Components API',
        subgroup: [
          {
            label: 'Dialogs',
            subgroup: [
              {
                label: 'InfoDialog',
                linkTo: '/components/info-dialog',
              },
            ],
          },
        ],
      },
      {
        label: 'API Gateway',
        subgroup: [
          { label: 'Introduction', linkTo: '/api-gateway/introduction' },
          { label: 'Authentication', linkTo: '/api-gateway/authentication' },
          { label: 'Proxy endpoints', linkTo: '/api-gateway/proxy-endpoints' },
          { label: 'GraphQL', linkTo: '/api-gateway/graphql' },
          {
            label: 'Proxy to external API',
            linkTo: '/api-gateway/proxy-to-external-api',
          },
        ],
      },
    ],
  },
  plugins: [
    /**
     *  Sources for loading content
     */

    /*
      gatsby-source-filesystem notes:
      https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=file#how-to-query
      Most of these files get queried through other transformers,
      but the `name` property here allows filtering allFile queries:
      allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
        edges {
          node { etc...
    */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `srcImages`,
        path: `${__dirname}/src/images`,
      },
    },
    // Assets (e.g. images) used from the markdown pages
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/assets`,
      },
    },
    // Main content pages (.mdx)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    // Pages for React components
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/../packages/application-components/src/components/`,
        ignore: ['.js'],
      },
    },

    /**
     * Transformers for making content available in graphql queries
     */

    // For querying images
    `gatsby-transformer-sharp`,

    // For querying MDX
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: [
          '.mdx',
          // ".md"
        ],
        remarkPlugins: [require('remark-slug'), require('remark-emoji')],
        gatsbyRemarkPlugins: [
          // Convert absolute image file paths to relative. Required for remark-images to work.
          // https://www.gatsbyjs.org/packages/gatsby-remark-relative-images/?=gatsby-remark-relative-images
          // See options ^ For how to convert images from frontmatter if needed.
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 740,
            },
          },
        ],
      },
    },

    /**
     * Plugins for general functionality
     */
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `${__dirname}/src/images/logo.svg`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'roboto mono',
          // https://design.google/library/spectral-new-screen-first-typeface/
          // 'Spectral:400,700',
          // https://design.google/library/choosing-web-fonts-beginners-guide/
          // 'Libre+Baskerville:400,400i,700',
          'Raleway:400,400i,700,700i',
        ],
      },
    },
    // This needs to be last
    'gatsby-plugin-meta-redirect',
  ],
};
