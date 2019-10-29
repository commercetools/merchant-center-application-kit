/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

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

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type NavigationYaml implements Node @dontInfer {
      id: ID!
      chapterTitle: String! @proxy(from: "chapter-title")
      pages: [Entry!]
    }

    type Entry {
      title: String!
      path: String!
      beta: Boolean
    }
  `);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'Mdx') {
    const { createNodeField } = actions;
    const slug = createFilePath({ node, getNode, basePath: 'pages' });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const extensionName = path.extname(page.componentPath);

  if (extensionName === '.md' || extensionName === '.mdx') {
    actions.deletePage(page);
    actions.createPage({
      ...page,
      // page.context.frontmatter can be used to dynamically select approriate templates
      component: require.resolve('./src/templates/page-content.js'),
      context: {
        ...page.context,
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: page.path,
      },
    });
    if (page.context.frontmatter.landing_page === true) {
      const [, chapterPath] = page.path.split('/');
      actions.createRedirect({
        fromPath: `/${chapterPath}`,
        toPath: page.path,
        isPermanent: true,
        redirectInBrowser: true,
      });
    }
  }
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
