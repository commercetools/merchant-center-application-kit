/* eslint-disable no-console */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'production',
  stats: 'minimal',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -20,
        },
        '@local-build/application-components': {
          test: /@local-build\/application-components/,
          name: '@local-build/application-components',
          chunks: 'all',
          priority: -15,
        },
        '@local-build/application-components': {
          test: /@local-build\/application-components/,
          name: '@local-build/application-components',
          chunks: 'all',
          priority: -15,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /(node_modules)/,
          /(application-components.es)/,
          /(react-notifications.es)/,
        ],
        use: {
          loader: 'babel-loader',
          query: {
            compact: true,
            presets: [
              require.resolve('@commercetools-frontend/babel-preset-mc-app'),
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: require.resolve('svg-url-loader'),
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@local-build/application-components': path.resolve(
        __dirname,
        '../packages/application-components/dist/application-components.es.js'
      ),
      '@local-build/react-notifications': path.resolve(
        __dirname,
        '../packages/react-notifications/dist/react-notifications.es.js'
      ),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
