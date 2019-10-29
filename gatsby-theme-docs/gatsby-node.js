/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = ({ reporter }) => {
  const requiredDirectories = [
    'src/data',
    'src/content',
    'src/images',
    'src/pages/files',
  ];
  requiredDirectories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

// Programmatically create MDX pages. While `gatsby-plugin-mdx` can automatically
// do that, we want to have more control over building those pages as we might
// have specific requirements (e.g. redirects).
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
    const template = require.resolve(`./src/templates/page-content.js`);
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
