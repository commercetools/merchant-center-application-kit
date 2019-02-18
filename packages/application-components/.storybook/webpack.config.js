const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const createWebpackConfig = require('../../mc-scripts/config/create-webpack-config-for-development');

const mcWebpackConfig = createWebpackConfig({
  distPath: 'unused',
  entryPoint: 'unused',
  sourceFolders: [
    path.resolve(__dirname),
    path.resolve(__dirname, '../../../README.md'),
    path.resolve(__dirname, '../src'),
  ],
  toggleFlags: {
    generateIndexHtml: false,
  },
});

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.plugins.push(
    new MomentLocalesPlugin({ localesToKeep: ['de', 'es'] })
  );
  storybookBaseConfig.devtool = 'cheap-module-source-map'; // TODO: should we use something differen?
  storybookBaseConfig.module.rules = [
    // Disable require.ensure as it's not a standard language feature.
    { parser: { requireEnsure: false } },
    // add story source
    {
      test: /\.story\.js$/,
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      enforce: 'pre',
    },
    ...mcWebpackConfig.module.rules,
    // Storybook uses a plugin to load and render markdown files.
    {
      test: /\.md$/,
      use: [
        { loader: require.resolve('html-loader') },
        { loader: require.resolve('markdown-loader') },
      ],
    },
  ];

  return storybookBaseConfig;
};
