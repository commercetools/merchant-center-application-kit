/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

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

exports.onCreatePage = async ({ page, actions }) => {
  actions.deletePage(page);
  // Each page has a "fullscreen" mode, however because of SSR we can't rely on
  // query parameters to toggle the view mode.
  // To make this work, we will generate a new page under a different path.
  // Both pages will then receive the `isFullScreen` as a prop.
  actions.createPage({ ...page, context: { isFullScreen: false } });
  actions.createPage({
    ...page,
    path: `${page.path}fullscreen`,
    context: { isFullScreen: true },
  });
};
