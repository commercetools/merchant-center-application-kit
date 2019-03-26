/* eslint-disable prettier/prettier */
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMediaQueries = require('postcss-custom-media');
const postcssColorModFunction = require('postcss-color-mod-function');
const browserslist = require('./browserslist');

const defaultToggleFlags = {
  // Allow to disable index.html generation in case it's not necessary (e.g. for Storybook)
  generateIndexHtml: true,
};

/**
 * This is a factory function to create the default webpack config
 * for a MC Application in `development` mode.
 * The function requires the file path to the related application
 * "entry point".
 */
module.exports = ({
  distPath,
  entryPoint,
  sourceFolders,
  toggleFlags = defaultToggleFlags,
}) => ({
  // https://webpack.js.org/concepts/#mode
  mode: 'development',

  // Using `cheap-module-source-map` doesn't provide the original source when
  // errors happen but it is still recommended as using `eval-source-map` leads
  // to CORS errors when an error happens
  // https://webpack.js.org/configuration/devtool/#devtool
  // https://reactjs.org/docs/cross-origin-errors.html#source-maps
  devtool: 'cheap-module-source-map',

  // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
  // https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
  optimization: {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    splitChunks: {
      chunks: 'all',
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },

  entry: {
    app: [
      // Ship a few polyfills by default
      require.resolve('./polyfills'),
      require.resolve('core-js/stable'),
      require.resolve('regenerator-runtime/runtime'),
      // Include an alternative client for WebpackDevServer. A client's job is to
      // connect to WebpackDevServer by a socket and get notified about changes.
      // When you save a file, the client will either apply hot updates (in case
      // of CSS changes), or refresh the page (in case of JS changes). When you
      // make a syntax error, this client will display a syntax error overlay.
      // Note: instead of the default WebpackDevServer client, we use a custom one
      // to bring better experience for Create React App users. You can replace
      // the line below with these two lines if you prefer the stock client:
      // require.resolve('webpack-dev-server/client') + '?/',
      // require.resolve('webpack/hot/dev-server'),
      require.resolve('react-dev-utils/webpackHotDevClient'),
      // Finally, this is your app's code
      entryPoint,
      // We include the app code last so that if there is a runtime error during
      // initialization, it doesn't blow up the WebpackDevServer client, and
      // changing JS code would still trigger a refresh.
    ],
  },

  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: '[name].js',
    // There are also additional JS chunk files when using code splitting.
    chunkFilename: '[name].chunk.js',
    // The build folder.
    path: path.join(distPath, 'assets'),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/',
    // Point sourcemap entries to the original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  plugins: [
    // Allows to "assign" custom options to the `webpack` object.
    // At the moment, this is used to share some props with `postcss.config`.
    new WebpackBar(),
    new webpack.LoaderOptionsPlugin({
      options: {
        sourceFolders,
        context: __dirname,
      },
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    toggleFlags.generateIndexHtml &&
      new HtmlWebpackPlugin({
        inject: false,
        filename: path.join(distPath, 'assets/index.html'),
        template: require.resolve('@commercetools-frontend/mc-html-template'),
      }),
    toggleFlags.generateIndexHtml &&
      (() => {
        // eslint-disable-next-line global-require
        const LocalHtmlWebpackPlugin = require('../webpack-plugins/local-html-webpack-plugin');
        return new LocalHtmlWebpackPlugin();
      })(),
    // Add module names to factory functions so they appear in browser profiler.
    // https://webpack.js.org/guides/caching/
    new webpack.NamedModulesPlugin(),
    // Strip all locales except `en`, `de`
    // (`en` is built into Moment and can't be removed).
    new MomentLocalesPlugin({ localesToKeep: ['de', 'es'] }),
    // This is necessary to emit hot updates (currently CSS only).
    new webpack.HotModuleReplacementPlugin(),
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
                require.resolve('@commercetools-frontend/babel-preset-mc-app'),
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
          require.resolve('style-loader'),
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
                  browsers: browserslist.development,
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
        test: function testForNormalCssFiles(fileName) {
          return (
            // Use this only for plain CSS.
            // For css-modules, see loader above.
            fileName.endsWith('.css') && !fileName.endsWith('.mod.css')
          );
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        oneOf: [
          {
            // Use "postcss" for all the included source folders.
            include: sourceFolders,
            use: [
              require.resolve('style-loader'),
              require.resolve('css-loader'),
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    postcssImport(),
                    postcssPresetEnv({
                      browsers: browserslist.development,
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
            include: /node_modules/,
            loaders: [
              require.resolve('style-loader'),
              require.resolve('css-loader'),
            ],
          },
        ],
      },
      // Process JS with Babel.
      {
        test: /\.js$/,
        use: [
          // This loader parallelizes code compilation, it is optional but
          // improves compile time on larger projects
          {
            loader: require.resolve('thread-loader'),
            options: {
              poolTimeout: Infinity, // keep workers alive for more effective watch mode
            },
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              compact: false,
              presets: [
                require.resolve('@commercetools-frontend/babel-preset-mc-app'),
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              highlightCode: true,
            },
          },
        ],
        include: sourceFolders,
      },
      // Allow to import `*.graphql` SDL files.
      {
        test: /\.graphql$/,
        include: sourceFolders,
        use: [require.resolve('graphql-tag/loader')],
      },
    ],
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

  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
});
