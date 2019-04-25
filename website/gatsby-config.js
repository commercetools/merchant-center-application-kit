/* eslint-disable global-require */

module.exports = {
  siteMetadata: {
    title: `Merchant Center Application Kit`,
    description: ``,
    author: `commercetools`,
    navbarLinks: [
      {
        label: 'Getting started',
        subgroup: [
          { label: 'Installation', linkTo: '/getting-started/installation' },
          { label: 'Usage', linkTo: '/getting-started/usage' },
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
                linkTo: '/components/dialogs/info-dialog',
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: [
          '.mdx',
          // ".md"
        ],
        remarkPlugins: [require('remark-slug'), require('remark-emoji')],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['roboto mono'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/../packages/application-components/src/components/`,
        ignore: ['.js'],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    // This needs to be last
    'gatsby-plugin-meta-redirect',
  ],
};
