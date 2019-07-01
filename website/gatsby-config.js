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
        groupKey: 'getting-started',
        subgroup: [
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
          {
            label: 'Dialogs',
            subgroup: [
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
            ],
          },
          {
            label: 'ModalPages',
            subgroup: [
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
            ],
          },
          { label: 'UI-Kit', linkTo: '/components/ui-kit' },
        ],
      },
      {
        label: 'Deployment',
        groupKey: 'deployment',
        subgroup: [
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
        ],
      },
      {
        label: 'Register applications',
        groupKey: 'register-applications',
        subgroup: [
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
          // For syntax code highlighting
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              colorTheme: 'Dracula',
              injectStyles: true,
              extensions: [
                {
                  identifier: 'dracula-theme.theme-dracula',
                  version: '2.18.0',
                },
              ],
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
          'Open+Sans:300,300i,400,400i,600,600i,700,700i',
        ],
      },
    },
    // This needs to be last
    'gatsby-plugin-meta-redirect',
  ],
};
