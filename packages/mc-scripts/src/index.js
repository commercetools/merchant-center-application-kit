const createWebpackConfigForDevelopment = require('./config/create-webpack-config-for-development');
const createWebpackConfigForProduction = require('./config/create-webpack-config-for-production');
const createDevServerConfig = require('./config/webpack-dev-server.config');
const vendorsToCompile = require('./config/vendors-to-transpile');

module.exports = {
  createWebpackConfigForDevelopment,
  createWebpackConfigForProduction,
  createDevServerConfig,
  vendorsToCompile,
};
