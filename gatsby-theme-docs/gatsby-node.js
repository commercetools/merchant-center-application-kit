/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');
const { createFilePath } = require('gatsby-source-filesystem');

const trimTrailingSlash = url => url.replace(/(\/?)$/, '');

// Ensure that certain directories exist.
// https://www.gatsbyjs.org/tutorial/building-a-theme/#create-a-data-directory-using-the-onprebootstrap-lifecycle
exports.onPreBootstrap = ({ reporter }) => {
  const requiredDirectories = [
    'src/data',
    'src/images',
    'src/content',
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
      pagination: Boolean
      pages: [Entry!]
    }

    type Entry {
      title: String!
      path: String!
      beta: Boolean
    }
  `);
};

exports.onCreateNode = ({ node, getNode, actions }, pluginOptions) => {
  if (node.internal.type === 'Mdx') {
    const originalSlug = createFilePath({ node, getNode, basePath: 'pages' });
    const slug = pluginOptions.createNodeSlug
      ? pluginOptions.createNodeSlug(originalSlug, { node })
      : originalSlug;
    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

// https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
exports.createPages = async ({ graphql, actions, reporter }) => {
  const allMdxPagesResult = await graphql(`
    query QueryAllMdxPages {
      allMdx(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (allMdxPagesResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "allMdx" query');
  }
  const navigationYamlResult = await graphql(`
    query QueryNavigationYaml {
      allNavigationYaml {
        nodes {
          chapterTitle
          pages {
            title
            path
          }
        }
      }
    }
  `);
  if (navigationYamlResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "allNavigationYaml" query');
  }
  const pages = allMdxPagesResult.data.allMdx.edges;
  const navigationPages = navigationYamlResult.data.allNavigationYaml.nodes.reduce(
    (pageLinks, node) => [...pageLinks, ...node.pages],
    []
  );
  // you'll call `createPage` for each result
  pages.forEach(({ node }) => {
    const matchingNavigationPage = navigationPages.find(
      page =>
        trimTrailingSlash(page.path) === trimTrailingSlash(node.fields.slug)
    );
    actions.createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: require.resolve('./src/templates/page-content.js'),
      // You can use the values in this context in
      // our page layout component
      context: {
        slug: node.fields.slug,
        shortTitle: matchingNavigationPage
          ? matchingNavigationPage.title
          : undefined,
      },
    });
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
