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
    sidebarLinks: [
      {
        label: 'Getting started',
        groupKey: 'getting-started',
        subgroup: [
          { label: 'Overview', linkTo: '/getting-started/overview' },
          {
            label: 'Installing a starter application',
            linkTo: '/getting-started/installing-a-starter-application',
          },
          { label: 'Tooling', linkTo: '/getting-started/tooling' },
        ],
      },
      {
        label: 'Development',
        groupKey: 'development',
        subgroup: [
          { label: 'Overview', linkTo: '/development/overview' },
          {
            label: 'Available scripts',
            linkTo: '/development/available-scripts',
          },
          {
            label: 'Folder structure',
            linkTo: '/development/folder-structure',
          },
          { label: 'Menu links', linkTo: '/development/menu-links' },
          { label: 'Styling', linkTo: '/development/styling' },
          { label: 'Testing', linkTo: '/development/testing' },
          { label: 'Translations', linkTo: '/development/translations' },
        ],
      },
      {
        label: 'UI Components',
        groupKey: 'components',
        subgroup: [
          { label: 'Overview', linkTo: '/components/overview' },
          {
            label: 'InfoDialog',
            linkTo: '/components/info-dialog',
          },
          {
            label: 'ConfirmationDialog',
            linkTo: '/components/confirmation-dialog',
          },
          {
            label: 'FormDialog',
            linkTo: '/components/form-dialog',
          },
          {
            label: 'InfoModalPage',
            linkTo: '/components/info-modal-page',
          },
          {
            label: 'FormModalPage',
            linkTo: '/components/form-modal-page',
          },
          {
            label: 'TabularModalPage',
            linkTo: '/components/tabular-modal-page',
          },
          { label: 'UI-Kit', linkTo: '/components/ui-kit' },
        ],
      },
      {
        label: 'Deployment',
        groupKey: 'deployment',
        subgroup: [
          { label: 'Overview', linkTo: '/deployment/overview' },
          { label: 'Production build', linkTo: '/deployment/production-build' },
          {
            label: 'Runtime configuration',
            linkTo: '/deployment/runtime-configuration',
          },
          { label: 'HTTP server', linkTo: '/deployment/http-server' },
          { label: 'Static server', linkTo: '/deployment/static-server' },
          {
            label: 'Serving static assets',
            linkTo: '/deployment/serving-static-assets',
          },
          { label: 'Example: Now v1', linkTo: '/deployment/example-now-v1' },
          { label: 'Example: Now v2', linkTo: '/deployment/example-now-v2' },
          {
            label: 'Example: Firebase',
            linkTo: '/deployment/example-firebase',
          },
          {
            label: 'Example: AWS - S3 & CloudFront',
            linkTo: '/deployment/example-aws-s3-cloudfront',
          },
        ],
      },
      {
        label: 'Register applications',
        groupKey: 'register-applications',
        subgroup: [
          { label: 'Overview', linkTo: '/register-applications/overview' },
          {
            label: 'Configuring a custom application',
            linkTo: '/register-applications/configuring-a-custom-application',
          },
          {
            label: 'Activating a custom application',
            linkTo: '/register-applications/activating-a-custom-application',
          },
          {
            label: 'Deleting a custom application',
            linkTo: '/register-applications/deleting-a-custom-application',
          },
          { label: 'Caveats', linkTo: '/register-applications/caveats' },
        ],
      },
      {
        label: 'Main concepts',
        groupKey: 'main-concepts',
        subgroup: [
          { label: 'Overview', linkTo: '/main-concepts/overview' },
          { label: 'Architecture', linkTo: '/main-concepts/architecture' },
          { label: 'Authentication', linkTo: '/main-concepts/authentication' },
          { label: 'API Gateway', linkTo: '/main-concepts/api-gateway' },
          { label: 'GraphQL API', linkTo: '/main-concepts/graphql' },
          {
            label: 'Proxy endpoints',
            linkTo: '/main-concepts/proxy-endpoints',
          },
          {
            label: 'Proxy to external API',
            linkTo: '/main-concepts/proxy-to-external-api',
          },
          {
            label: 'Application Shell',
            linkTo: '/main-concepts/application-shell',
          },
          { label: 'Data fetching', linkTo: '/main-concepts/data-fetching' },
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
        ignore: ['.js', '.tsx'],
      },
    },

    /**
     * Transformers for making content available in graphql queries
     */

    // For querying images
    `gatsby-transformer-sharp`,

    // For querying MDX
    {
      resolve: 'gatsby-plugin-mdx',
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
        plugins: ['gatsby-remark-images'], // workaround https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-510153237
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
