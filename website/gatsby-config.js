/* eslint-disable global-require */

module.exports = {
  pathPrefix: '/app-kit',
  siteMetadata: {
    title: 'AppKit | commercetools docs',
    description: 'Develop applications for the Merchant Center',
    author: 'commercetools',
    repositoryUrl:
      'https://github.com/commercetools/merchant-center-application-kit',
    currentVersion:
      // Keep the version fixed in case we build the website for snapshot testing.
      // This way, we avoid invalid snapshots every time we release a new version.
      process.env.BUILD_TARGET === 'percy'
        ? '0.0.0'
        : require('../lerna.json').version,
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
        path: `${__dirname}/src/static/assets`,
      },
    },
    // Main content pages (.mdx)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        // NOTE: since we want to programmatically `createPage` in `gatsby-node`,
        // we can't put the `mdx` files into `src/pages`, as `gatsby-plugin-mdx` will
        // create them automatically, resulting in conflicting pages.
        // See https://github.com/gatsbyjs/gatsby/issues/16224#issuecomment-529097809
        path: `${__dirname}/src/content`,
      },
    },
    // Data files (.yaml)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `configurationData`,
        path: `${__dirname}/src/data`,
      },
    },
    // Pages for React components
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/../packages/application-components/src/components/`,
        ignore: ['.js', '.tsx'],
      },
    },

    /**
     * Transformers for making content available in graphql queries
     */

    // For querying images
    `gatsby-transformer-sharp`,

    // For querying configuration data
    `gatsby-transformer-yaml`,

    // For querying MDX
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [
          '.mdx',
          // ".md"
        ],
        // List of remark plugins, that transform the markdown AST.
        remarkPlugins: [require('remark-emoji')],
        // List of rehype plugins, that transform the HTML AST.
        rehypePlugins: [
          require('rehype-slug'),
          require('./src/plugins/rehype-mdx-section'),
        ],
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
              maxWidth: 770 - 8 - 8, // content width - padding left/right
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'files',
            },
          },
        ],
        // workaround https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-510153237
        plugins: ['gatsby-remark-images', 'gatsby-remark-copy-linked-files'],
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
        logo: `${__dirname}/src/images/icons/logo.svg`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/icons/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Roboto:400,400i,500,700', 'Roboto+Mono:400,500'],
      },
    },
    // This needs to be last
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-netlify-cache',
  ],
};
