/* eslint-disable prettier/prettier */
const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// as "aliasing v1.0.0 as webpack.optimize.UglifyJsPlugin is scheduled for
// webpack v4.0.0" (https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)
// we need to explicitly use the library to be using the newest version
const TerserPlugin = require('terser-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMediaQueries = require('postcss-custom-media');
const postcssColorModFunction = require('postcss-color-mod-function');
const FinalStatsWriterPlugin = require('../webpack-plugins/final-stats-writer-plugin');
const browserslist = require('./browserslist');

const optimizeCSSConfig = {
  // Since css-loader uses cssnano v3.1.0, it's best to stick with the
  // same version here
  cssProcessor: cssnano,
  // This safe condition is necessary (as of v3 of cssnano) else we will run into
  // problems, learn more👇
  // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/28
  cssProcessorOptions: {
    // The previous safe option has been removed this is a fix from
    // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/65#issuecomment-405721294
    parser: safeParser,
    discardComments: { removeAll: true },
  },
};

const defaultToggleFlags = {
  // Allow to disable CSS extraction in case it's not necessary (e.g. for Storybook)
  enableExtractCss: true,
  // Allow to disable index.html generation in case it's not necessary (e.g. for Storybook)
  generateIndexHtml: true,
};

/**
 * This is a factory function to create the default webpack config
 * for a MC Application in `production` mode.
 * The function requires the file path to the related application
 * "entry point".
 */
module.exports = ({
  distPath,
  entryPoint,
  sourceFolders,
  toggleFlags,
  // some vendors ship es6 code that has not been transpiled to es5.
  // in order to keep compatibility with browsers, and to save build time
  // we don't run babel on node_modules, just on the required modules
  vendorsToTranspile = [],
}) => {
  const mergedToggleFlags = { ...defaultToggleFlags, ...toggleFlags };

  return {
    // Don't attempt to continue if there are any errors.
    bail: true,

    // https://webpack.js.org/concepts/#mode
    mode: 'production',

    // We generate sourcemaps in production. This is slow but gives good results.
    // Sourcemaps are pushed to Google Storage and Sentry.
    // https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'source-map',

    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    // https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: true,
        }),
        mergedToggleFlags.enableExtractCss &&
          new OptimizeCSSAssetsPlugin(optimizeCSSConfig),
      ].filter(Boolean),
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      splitChunks: {
        chunks: 'all',
        // NOTE: if you enable `cacheGroups` for CSS, remember to toggle it with
        // the `mergedToggleFlags.enableExtractCss`
      },
      // Keep the runtime chunk seperated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true,
    },

    // In production, we only want to load the polyfills and the app code.
    entry: {
      app: [
        require.resolve('./polyfills'),
        require.resolve('core-js/stable'),
        require.resolve('regenerator-runtime/runtime'),
        entryPoint,
      ],
    },

    output: {
      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      filename: '[name].[chunkhash].js',
      chunkFilename: '[id].[name].[chunkhash].js',
      // The build folder.
      path: path.join(distPath, 'assets'),
      pathinfo: false,
      // Will be injected on runtime. See `packages/application-shell/src/public-path.js`
      publicPath: '',
    },

    plugins: [
      new CleanWebpackPlugin([distPath], {
        allowExternal: true,
      }),
      // Allows to "assign" custom options to the `webpack` object.
      // At the moment, this is used to share some props with `postcss.config`.
      new webpack.LoaderOptionsPlugin({
        options: {
          sourceFolders,
          context: __dirname,
        },
      }),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }.
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      // Add module names to factory functions so they appear in browser profiler.
      // NOTE: instead of using `HashedModuleIdsPlugin`, we use `NamedModulesPlugin`
      // for production as well, despite the `HashedModuleIdsPlugin` being the
      // recommended choice for production.
      // It appears that using `HashedModuleIdsPlugin` the gzipped bundles are
      // bigger in size compared to the bundles produces by `NamedModulesPlugin`.
      // Therefore we go for the choice of having smaller bundles.
      // Refs:
      // - https://gitlab.com/gitlab-org/gitlab-ce/issues/32835
      // - https://medium.com/@schnibl/hashes-are-had-to-zip-pathnames-not-therefore-your-end-result-with-named-modules-is-unintuitively-94baa1a507e
      new webpack.NamedModulesPlugin(),
      // Strip all locales except `en`, `de`
      // (`en` is built into Moment and can't be removed)
      new MomentLocalesPlugin({ localesToKeep: ['de', 'es'] }),

      // Generate a `stats.json` file containing information and paths to
      // the assets that webpack created.
      // This is necessary to programmatically refer to the correct bundle path
      // in the `index.html`.
      new FinalStatsWriterPlugin({
        outputPath: distPath,
        includeFields: ['entrypoints', 'assets', 'publicPath', 'time'],
      }),
      mergedToggleFlags.generateIndexHtml &&
        new HtmlWebpackPlugin({
          inject: false,
          filename: 'index.html.template',
          template: require.resolve('@commercetools-frontend/mc-html-template'),
        }),
      mergedToggleFlags.enableExtractCss && // Extracts CSS into one CSS file to mimic CSS order in dev
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css',
          chunkFilename: '[id].[name].[chunkhash].css',
        }),
      process.env.ANALYZE_BUNDLE === 'true' &&
        new BundleAnalyzerPlugin({
          defaultSizes: 'gzip',
        }),
    ].filter(Boolean),

    module: {
      // Makes missing exports an error instead of warning.
      strictExportPresence: true,

      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        // For svg icons, we want to get them transformed into React components
        // when we import them.
        {
          test: /\.react\.svg$/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                presets: [
                  require.resolve(
                    '@commercetools-frontend/babel-preset-mc-app'
                  ),
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                highlightCode: true,
              },
            },
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                // NOTE: disable this and manually add `removeViewBox: false` in the SVGO plugins list
                // See related PR: https://github.com/smooth-code/svgr/pull/137
                icon: false,
                svgoConfig: {
                  plugins: [
                    { removeViewBox: false },
                    // Keeps ID's of svgs so they can be targeted with CSS
                    { cleanupIDs: false },
                  ],
                },
              },
            },
          ],
        },
        // For normal svg files (not icons) we should load the file normally
        // and simply use it as a `<img src/>`.
        {
          test: function testForNormalSvgFiles(fileName) {
            return (
              // Use this only for plain SVG.
              // For SVG as React components, see loader above.
              fileName.endsWith('.svg') && !fileName.endsWith('.react.svg')
            );
          },
          use: [
            {
              loader: require.resolve('svg-url-loader'),
              options: { noquotes: true },
            },
          ],
        },
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        {
          test: /\.png$/,
          use: [require.resolve('url-loader')],
        },
        // "postcss" loader applies autoprefixer to our CSS
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        {
          test: /\.mod\.css$/,
          include: sourceFolders,
          use: [
            mergedToggleFlags.enableExtractCss
              ? MiniCssExtractPlugin.loader
              : require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                plugins: () => [
                  postcssImport({ path: sourceFolders }),
                  postcssPresetEnv({
                    browsers: browserslist.production,
                    autoprefixer: { grid: true },
                  }),
                  postcssCustomProperties({
                    preserve: false,
                    importFrom: require.resolve(
                      '@commercetools-frontend/ui-kit/materials/custom-properties.css'
                    ),
                  }),
                  postcssCustomMediaQueries({
                    importFrom: require.resolve(
                      '@commercetools-frontend/application-components/materials/media-queries.css'
                    ),
                  }),
                  postcssColorModFunction(),
                  postcssReporter(),
                ],
              },
            },
          ],
        },
        {
          test: function testForNormalCssFiles(fileName) {
            return (
              // Use this only for plain CSS.
              // For css-modules, see loader above.
              fileName.endsWith('.css') && !fileName.endsWith('.mod.css')
            );
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "MiniCssExtractPlugin" or "style" loader extracts css to one file per css file.
          oneOf: [
            {
              // Use "postcss" for all the included source folders.
              include: sourceFolders,
              use: [
                mergedToggleFlags.enableExtractCss
                  ? MiniCssExtractPlugin.loader
                  : require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      postcssImport(),
                      postcssPresetEnv({
                        browsers: browserslist.production,
                        autoprefixer: { grid: true },
                      }),
                      postcssCustomMediaQueries({
                        importFrom: require.resolve(
                          '@commercetools-frontend/application-components/materials/media-queries.css'
                        ),
                      }),
                      postcssCustomProperties({
                        preserve: false,
                        importFrom: require.resolve(
                          '@commercetools-frontend/ui-kit/materials/custom-properties.css'
                        ),
                      }),
                      postcssColorModFunction(),
                      postcssReporter(),
                    ],
                  },
                },
              ],
            },
            {
              // For all other vendor CSS, do not use "postcss" loader.
              // But still use MiniCssExtractPlugin :)
              include: /node_modules/,
              loaders: [
                mergedToggleFlags.enableExtractCss
                  ? MiniCssExtractPlugin.loader
                  : require.resolve('style-loader'),
                require.resolve('css-loader'),
              ],
            },
          ],
        },
        // Process application JavaScript with Babel.
        {
          test: /\.js$/,
          use: [
            // This loader parallelizes code compilation, it is optional but
            // improves compile time on larger projects
            require.resolve('thread-loader'),
            {
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                compact: false,
                presets: [
                  require.resolve(
                    '@commercetools-frontend/babel-preset-mc-app'
                  ),
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                highlightCode: true,
              },
            },
          ],
          include: sourceFolders.concat(vendorsToTranspile),
        },
        // Allow to import `*.graphql` SDL files.
        {
          test: /\.graphql$/,
          include: sourceFolders,
          use: [require.resolve('graphql-tag/loader')],
        },
      ].filter(Boolean),
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    // Turn off performance hints in production because we utilize
    // our own hints via the FileSizeReporter (toolbox/build.js).
    performance: {
      hints: false,
    },
  };
};
