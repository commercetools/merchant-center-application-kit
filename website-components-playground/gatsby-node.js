/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  config.module.rules = [
    ...config.module.rules,
    {
      // Fix for react-intl
      // https://github.com/formatjs/formatjs/issues/143#issuecomment-518774786
      test: /\.mjs$/,
      type: 'javascript/auto',
    },
  ];
  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-preval',
  });
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
      importSource: '@emotion/react',
    },
  });
};

exports.createPages = ({ actions }) => {
  const { createRedirect, createPage } = actions;

  createPage({
    path: '/tab-one',
    component: require.resolve('./src/pages/tabular-modal-page.js'),
  });

  createPage({
    path: '/tab-two',
    component: require.resolve('./src/pages/tabular-modal-page.js'),
  });

  createRedirect({
    fromPath: `/tabular-modal-page/`,
    toPath: `/tab-one`,
    redirectInBrowser: true,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/tabular-modal-page`,
    toPath: `/tab-one`,
    redirectInBrowser: true,
    isPermanent: true,
  });
};
