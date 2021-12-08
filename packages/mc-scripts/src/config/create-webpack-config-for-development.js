/* eslint-disable prettier/prettier */
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');
const vendorsToTranspile = require('./vendors-to-transpile');
const createPostcssConfig = require('./create-postcss-config');
const hasJsxRuntime = require('./has-jsx-runtime');

const defaultToggleFlags = {
  // Allow to disable index.html generation in case it's not necessary (e.g. for Storybook)
  generateIndexHtml: true,
  // Some environemnts do not require `core-js` and can hence disable
  // it explicitely. This will disable `core-js` for `preset-env` and the
  // `plugin-transform-runtime`.
  disableCoreJs: false,
};
const defaultOptions = {
  entryPoint: paths.entryPoint,
  sourceFolders: paths.sourceFolders,
  postcssOptions: {},
  toggleFlags: defaultToggleFlags,
};

// Whether or not `react-refresh` is enabled, `react-refresh` is not 100% stable at this time,
// which is why it's disabled by default.
const hasReactRefresh = process.env.FAST_REFRESH === 'true';
const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient'
);
const reactRefreshOverlayEntry = require.resolve(
  'react-dev-utils/refreshOverlayInterop'
);

/**
 * This is a factory function to create the default webpack config
 * for a MC Application in `development` mode.
 * The function requires the file path to the related application
 * "entry point".
 *
 * @param {Object} options - Options to configure the Webpack config
 * @param {string} options.entryPoint - The absolute path to the application entry point file.
 * @param {string[]} options.sourceFolders[] - A list of folders where Webpack should look for source files.
 * @param {Object} options.postcssOptions - Options related to Postcss plugins. See `createPostcssConfig` function.
 * @param {Object} options.toggleFlags - Options to enable/disable certain functionalities of the Webpack config.
 */
module.exports = function createWebpackConfigForDevelopment(options = {}) {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    toggleFlags: {
      ...defaultToggleFlags,
      ...options.toggleFlags,
    },
  };

  return {
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
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: {
        name: 'runtime',
      },
      moduleIds: 'named',
      chunkIds: 'deterministic',
    },

    resolve: {
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: ['js', 'mjs', 'cjs', 'ts', 'tsx', 'json', 'jsx'].map(
        (ext) => `.${ext}`
      ),
    },

    entry: {
      app: [
        require.resolve('./application-runtime'),
        !mergedOptions.toggleFlags.disableCoreJs &&
          require.resolve('core-js/stable'),
        // When using the experimental `react-refresh` integration,
        // the webpack plugin takes care of injecting the dev client for us.
        !hasReactRefresh &&
          // Include an alternative client for WebpackDevServer. A client's job is to
          // connect to WebpackDevServer by a socket and get notified about changes.
          // When you save a file, the client will either apply hot updates (in case
          // of CSS changes), or refresh the page (in case of JS changes). When you
          // make a syntax error, this client will display a syntax error overlay.
          // Note: instead of the default WebpackDevServer client, we use a custom one
          // to bring better experience for Create React App users. You can replace
          // the line below with these two lines if you prefer the stock client:
          //
          // require.resolve('webpack-dev-server/client') + '?/',
          // require.resolve('webpack/hot/dev-server'),
          webpackDevClientEntry,
        // Finally, this is your app's code
        mergedOptions.entryPoint,
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn't blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
      ].filter(Boolean),
    },

    output: {
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: '[name].js',
      // There are also additional JS chunk files when using code splitting.
      chunkFilename: '[name].chunk.js',
      // The build folder.
      path: paths.appBuild,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // This is the URL that app is served from. We use "/" in development.
      publicPath: '/',
      // Point sourcemap entries to the original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: (info) =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },

    plugins: [
      new WebpackBar(),
      // Allows to "assign" custom options to the `webpack` object.
      // At the moment, this is used to share some props with `postcss.config`.
      new webpack.LoaderOptionsPlugin({
        options: {
          sourceFolders: mergedOptions.sourceFolders,
          context: __dirname,
        },
      }),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'development') { ... }.
      new webpack.DefinePlugin({
        __DEV__: 'true',
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      mergedOptions.toggleFlags.generateIndexHtml &&
        new HtmlWebpackPlugin({
          inject: false,
          filename: paths.appIndexHtml,
          template: require.resolve(
            '@commercetools-frontend/mc-html-template/webpack'
          ),
        }),
      mergedOptions.toggleFlags.generateIndexHtml &&
        (() => {
          // eslint-disable-next-line global-require
          const LocalHtmlWebpackPlugin = require('../webpack-plugins/local-html-webpack-plugin');
          return new LocalHtmlWebpackPlugin();
        })(),
      // Strip all locales except `en`, `de`
      // (`en` is built into Moment and can't be removed).
      new MomentLocalesPlugin({
        localesToKeep: ['de', 'es', 'fr', 'zh-cn', 'ja'],
      }),
      // This is necessary to emit hot updates (CSS and Fast Refresh):
      new webpack.HotModuleReplacementPlugin(),
      // Experimental hot reloading for React .
      // https://github.com/facebook/react/tree/master/packages/react-refresh
      hasReactRefresh &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            entry: webpackDevClientEntry,
            // The expected exports are slightly different from what the overlay exports,
            // so an interop is included here to enable feedback on module-level errors.
            module: reactRefreshOverlayEntry,
            // Since we ship a custom dev client and overlay integration,
            // the bundled socket handling logic can be eliminated.
            sockIntegration: false,
          },
        }),
    ].filter(Boolean),

    module: {
      // Makes missing exports an error instead of warning.
      strictExportPresence: true,

      rules: [
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
                  [
                    require.resolve(
                      '@commercetools-frontend/babel-preset-mc-app'
                    ),
                    {
                      runtime: hasJsxRuntime() ? 'automatic' : 'classic',
                      disableCoreJs: mergedOptions.toggleFlags.disableCoreJs,
                    },
                  ],
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
                icon: false,
                svgoConfig: {
                  plugins: [
                    {
                      // https://github.com/svg/svgo#default-preset
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
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
            },
          ],
        },
        {
          test: /\.png$/,
          type: 'asset/resource',
        },
        // "postcss" loader applies autoprefixer to our CSS
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        {
          test: /\.mod\.css$/,
          include: mergedOptions.sourceFolders,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  localIdentHashPrefix: 'ct',
                },
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: createPostcssConfig(
                  mergedOptions.postcssOptions
                ),
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
              include: mergedOptions.sourceFolders,
              use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: createPostcssConfig(
                      mergedOptions.postcssOptions
                    ),
                  },
                },
              ],
            },
            {
              // For all other vendor CSS, do not use "postcss" loader.
              include: /node_modules/,
              use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
              ],
            },
          ],
        },
        // Fix for react-intl
        // https://github.com/formatjs/formatjs/issues/143#issuecomment-518774786
        {
          test: /\.mjs$/,
          type: 'javascript/auto',
          resolve: {
            // https://webpack.js.org/configuration/module/#resolvefullyspecified
            fullySpecified: false,
          },
        },
        // Process JS with Babel.
        {
          test: /\.(js|mjs|cjs|jsx|ts|tsx)$/,
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
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve(
                      '@commercetools-frontend/babel-preset-mc-app'
                    ),
                    {
                      runtime: hasJsxRuntime() ? 'automatic' : 'classic',
                    },
                  ],
                ],
                plugins: [
                  hasReactRefresh && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                highlightCode: true,
              },
            },
          ],
          include: mergedOptions.sourceFolders.concat(vendorsToTranspile),
          // Disable require.ensure as it's not a standard language feature.
          parser: { requireEnsure: false },
        },
        // Allow to import `*.graphql` SDL files.
        {
          test: /\.graphql$/,
          include: mergedOptions.sourceFolders,
          use: [require.resolve('graphql-tag/loader')],
        },
      ],
    },
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,

    // For dev server
    infrastructureLogging: {
      level: 'none',
    },
  };
};
