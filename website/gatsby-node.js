/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const allMarkdown = await graphql(`
    {
      allMdx(limit: 1000) {
        edges {
          node {
            frontmatter {
              id
              title
              permalink
              redirect_from
              beta
            }
          }
        }
      }
    }
  `);

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);
    throw Error(allMarkdown.errors);
  }

  allMarkdown.data.allMdx.edges.forEach(edge => {
    const template = path.resolve(`src/templates/page-content.js`);
    actions.createPage({
      path: edge.node.frontmatter.permalink,
      component: template,
      // The context is passed as props to the component as well
      // as into the component's GraphQL query.
      context: {
        id: edge.node.frontmatter.id,
      },
    });

    if (edge.node.frontmatter.redirect_from) {
      edge.node.frontmatter.redirect_from.forEach(fromPath => {
        actions.createRedirect({
          fromPath,
          toPath: edge.node.frontmatter.permalink,
          isPermanent: true,
          redirectInBrowser: true,
        });
      });
    }
  });
};

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
